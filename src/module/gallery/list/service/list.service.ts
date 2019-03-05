import { Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery_list } from '../entities/list.entity' ;
import { Repository } from 'typeorm' ;
import { Response, QueryBuilderService } from '../../../../share' ;
import { ShopService } from '../../../system/shop/service/shop.service';
import { CONFIG } from '../../../../share/config';
import * as sharp from 'sharp' ;
import { TypeService } from '../../type';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ListService {
	constructor(
		@InjectRepository(Gallery_list) private readonly list: Repository< Gallery_list > ,
		private shopSer: ShopService ,
		private typeSer: TypeService
	) {}

	async get( page: number = 1 , size: number = 10 ): Promise< any > {
		const data = await QueryBuilderService.query({ page, size } , {}  , this.list) ;

		if ( data.success === true && data.data ) {
			for ( const item of data.data ) {
				const shopId = item.shopId ;
				item.shopInfo = (await this.shopSer.findByIds([shopId]))[0] ;
				item.typeInfo = (await this.typeSer.findByIds( [ item.typeId ]))[0];
				const base64Path = Buffer.from( item.url ).toString('base64') ;
				item.url = CONFIG.image.prefix + '/gallery/list/get/' + base64Path ;
			}
		}

		return data ;
	}

	async post( data: any ): Promise<any> {
		try {
			const shop = this.list.create(data) ;
			await this.list.insert( shop ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async put( data: any ): Promise<any> {
		try {
			const shop = this.list.create(data) ;
			const result = await this.list.save( shop ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async delete( id: number ): Promise< any > {
		try {
			const data = await this.list.findOne( id ) ;
			const filePath = path.resolve(CONFIG.image.uploadDir , data.url ) ;
			await this.list.delete( id ) ;
			return Response.success( { data }) ;
		} catch (e) {
			console.log(e) ;
			return Response.error( { message : e }) ;
		}
	}

	async getImg( dir: string , q: number , s: number[] ): Promise< any> {
		const data = sharp(dir)
			.jpeg({
				quality: q ,
			})
			.resize(s[0] , s[1])
			.toBuffer() ;

		return data ;
	}
}
