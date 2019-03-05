import { Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from '../entities/shop.entity' ;
import { Repository } from 'typeorm' ;
import { TreeQueryService, Response, QueryBuilderService } from '../../../../share' ;

@Injectable()
export class ShopService {
	constructor(
		@InjectRepository(Shop) private readonly shop: Repository< Shop > ,
	) {}

	async get( page: number = 1 , size: number = 10 , query: any ): Promise< any > {
		return QueryBuilderService.query({ page, size }, query, this.shop) ;
	}

	async getAll(): Promise< any > {
		const data = await this.shop.find() ;
		return  Response.success( { data } ) ;
	}

	async findByIds( ids: number[] ): Promise< any > {
		return this.shop.findByIds( ids ) ;
	}

	async post( data: any ): Promise<any> {
		try {
			const shop = this.shop.create(data) ;

			await this.shop.insert( shop ) ;

			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async put( data: any ): Promise<any> {
		try {
			const shop = this.shop.create(data) ;
			const result = await this.shop.save( shop ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async delete( id: number ): Promise< any > {
		try {
			await this.shop.delete( id ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}
}
