import { Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity' ;
import { Repository } from 'typeorm' ;
import { Response, QueryBuilderService } from '../../../../share' ;
import { DepartService } from '../../depart';
import { RoleService } from '../../role';
import { MenuService } from '../../menu';
import { ShopService } from '../../shop';
import { DateUtils } from '../../../../share/utils';
import { CONFIG } from '../../../../share/config';
import * as md5 from 'md5' ;

@Injectable()
export class StaffService {
	constructor(
		@InjectRepository(Staff) private readonly staff: Repository< Staff > ,
		private readonly departService: DepartService ,
		private readonly roleService: RoleService ,
		private readonly menuService: MenuService ,
		private readonly shopService: ShopService
	) {}

	private recursive( parent: any[] , source: any[] , allowIds: number[] ): void {
		parent.forEach( item => {
			item.children = [] ;
			
			const id = item.id ;

			source.forEach( child => {
				const parentId = child.parentId ;
				const childId = child.id ;
				if ( id === parentId && !!~allowIds.indexOf( childId )) {
					item.children.push( child ) ;
				}
			});

			if (item.children.length > 0 ) {
				this.recursive( item.children , source , allowIds ) ;
			}
		});
	}

	async get( page: number = 1 , size: number = 10 , query: any ): Promise< any > {
		const columns = 'id , username , name ,remark , createTime, status , openid , departIds , roleIds, shopIds , phoneNumber';
		const data = await QueryBuilderService.query({ page, size }, query, this.staff , columns ) ;

		if ( data.success === true && data.data ) {
			for ( const item of data.data ) {
				const roleIds = item.roleIds.split(',') ;
				const departIds = item.departIds.split(',') ;
				const shopIds = item.shopIds.split(',') ;
				item.departmentDTOS = await this.departService.findByIds( departIds ) ;
				item.roleOutputVOS = await this.roleService.findByIds( roleIds ) ;
				item.shopOutputVOS = await this.shopService.findByIds( shopIds ) ;
			}
		}
		return data ;
	}

	async post( data: any ): Promise< any > {
		try {
			const shop = this.staff.create(data) ;
			await this.staff.insert( shop ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async put( data: any ): Promise<any> {
		try {
			const shop = this.staff.create(data) ;
			const result = await this.staff.save( shop ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}

	async login( data: any ): Promise< any > {
		const username = data.username ;
		const password = data.password ;

		const findUser = await this.staff.find({ username , password } );
		const userInfo = findUser[0];
		if ( userInfo ) {

			if ( userInfo.roleIds.length <= 0 ) {
				return Response.error({ message: '该账户未拥有任何权限,请联系管理员'});
			}

			if ( userInfo.status === 0 ) {
				return Response.error( { message: '该账户已被冻结,请联系管理员'}) ;
			}

			const roleIds = userInfo.roleIds.split(',') ;
			const departIds = userInfo.departIds.split(',') ;
			const shopIds = userInfo.shopIds.split(',') ;

			const roleInfo = await this.roleService.findByIds( roleIds.map( item => Number( item ) )) ;
			const departInfo = await this.departService.findByIds( departIds.map( item => Number( item ) )) ;
			const shopInfo = await this.departService.findByIds( shopIds.map( item => Number( item ) )) ;

			const allMenu = (await this.menuService.findAll()).data ;
			const menuIds = [] ;

			roleInfo.forEach( item => {
				item.menuIds.split(',').forEach(  val => {
					const id = Number( val ) ;
					if ( !~menuIds.indexOf( id ) ) {
						menuIds.push( id ) ;
					}
				});
			});

			const menuInfo = [] ;

			let idx = 0 ;
			while ( menuIds.length > idx ) {
				const id = menuIds[idx] ;

				allMenu.forEach( ( item , index ) => {
					if (item.id === id && item.parentId === 0 && !!~menuIds.indexOf( item.id )) {
						menuInfo.push( item ) ;
						allMenu.splice( index , 1 ) ;
					}
				});
				idx ++ ;
			}

			this.recursive( menuInfo , allMenu  , menuIds ) ;
			const value = md5(Number(DateUtils.getNow(true)) + CONFIG.tokenTime);
			const token = { value } ;
			return Response.success( { data :  { userInfo  , roleInfo , menuInfo , departInfo , shopInfo , token  } }) ;
		} else {
			return Response.error({ message : '用户不存在或密码不正确'}) ;
		}
	}

	async delete( id: number ): Promise< any > {
		try {
			await this.staff.delete( id ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message : e }) ;
		}
	}
}
