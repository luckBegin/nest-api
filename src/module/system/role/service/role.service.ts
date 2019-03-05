import { Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity' ;
import { Repository } from 'typeorm' ;
import { TreeQueryService, Response, QueryBuilderService } from '../../../../share' ;

@Injectable()
export class RoleService {
	constructor(
		@InjectRepository( Role ) private readonly role: Repository< Role > ,
	) {}

	async get( page: number = 1 , size: number = 10 , query: any ): Promise< any > {
		return QueryBuilderService.query({ page, size }, query, this.role) ;
	}

	async findByIds( ids: number[] ): Promise< any > {
		return this.role.findByIds( ids ) ;
	}

	async post( data: any ): Promise<any> {
		try {
			const role = this.role.create(data) ;

			await this.role.insert( role ) ;

			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async put( data: any ): Promise<any> {
		try {
			const shop = this.role.create(data) ;
			await this.role.save( shop ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async delete( id: number ): Promise< any > {
		try {
			await this.role.delete( id ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}
}
