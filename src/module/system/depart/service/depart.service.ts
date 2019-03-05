import { Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Depart } from '../entities/depart.entity' ;
import { Repository } from 'typeorm' ;
import { TreeQueryService , Response } from '../../../../share' ;
@Injectable()
export class DepartService {

	constructor(
		@InjectRepository( Depart )
		private readonly depart: Repository< Depart > ,
	) {}

	async get(): Promise< any > {
		const data = await TreeQueryService.getTree( this.depart , true ) ;
		return Response.success({ data }) ;
	}

	async delete( id: number ): Promise< any > {
		try {
			await this.depart.delete( id ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async post( data: any ): Promise< any > {
		const Data = this.depart.create(data) ;

		console.log(data) ;
		try {
			await this.depart.insert( Data ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e } ) ;
		}
	}

	async put( data: any ): Promise< any > {
		try {
			const item = this.depart.create( data ) ;
			await this.depart.save( item ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e } ) ;
		}
	}

	async findByIds( ids: number[] ): Promise<any> {
		return this.depart.findByIds(ids) ;
	}
}
