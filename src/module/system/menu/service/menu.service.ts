import { Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../entities/menu.entity' ;
import { Repository } from 'typeorm' ;
import { TreeQueryService , Response } from '../../../../share' ;
@Injectable()
export class MenuService {

	constructor(
		@InjectRepository( Menu )
		private readonly menu: Repository< Menu > ,
	) {}

	async get( parentId: number[] ): Promise< any > {
		const data = await TreeQueryService.getTree( this.menu , false , parentId) ;
		return Response.success({ data }) ;
	}

	async findAll(): Promise< any > {
		return Response.success( { data : await this.menu.find() } ) ;
	}

	async delete( id: number ): Promise< any > {
		try {
			await this.menu.delete( id ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async post( data: any ): Promise< any > {
		const Data = this.menu.create(data) ;
		try {
			await this.menu.insert( Data ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e } ) ;
		}
	}

	async put( data: any ): Promise< any > {
		try {
			const item = this.menu.create( data ) ;
			await this.menu.save( item ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e } ) ;
		}
	}
}
