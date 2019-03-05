import { Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery_type } from '../entities/type.entity' ;
import { Repository } from 'typeorm' ;
import { Response, QueryBuilderService } from '../../../../share' ;
import { ShopService } from '../../../system/shop/service/shop.service';

@Injectable()
export class TypeService {
	constructor(
		@InjectRepository(Gallery_type) private readonly type: Repository< Gallery_type > ,
		private shopSer: ShopService
	) {}

	async get( page: number = 1 , size: number = 10 ): Promise< any > {
		const data = await QueryBuilderService.query({ page, size } , {}  , this.type) ;

		if ( data.success === true && data.data ) {
			for ( const item of data.data ) {
				const shopId = item.shopId ;
				item.shopInfo = (await this.shopSer.findByIds([shopId]))[0] ;
			}
		}
		return data ;
	}

	async getAll(): Promise< any > {
		const data = await this.type.find() ;
		return  Response.success( { data } ) ;
	}

	async findByIds( ids ): Promise< any > {
		return await this.type.findByIds( ids ) ;
	}

	async post( data: any ): Promise<any> {
		try {
			const shop = this.type.create(data) ;

			await this.type.insert( shop ) ;

			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async put( data: any ): Promise<any> {
		try {
			const shop = this.type.create(data) ;
			const result = await this.type.save( shop ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async delete( id: number ): Promise< any > {
		try {
			await this.type.delete( id ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}
}
