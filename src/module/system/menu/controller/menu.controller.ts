import { Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query } from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { MenuService } from '../service/menu.service';
import { Response } from '../../../../share' ;
import { Menu } from '../entities/menu.entity';
const urlPrefix: string = 'system/menu' ;
@ApiUseTags('系统菜单控制器')
@Controller()
export class  MenuController {
	constructor(
		private readonly service: MenuService ,
	) {}

 	@Get( urlPrefix + '/tree')
	@ApiResponse({ status: 200 , description : '成功' , type : Menu })
	@ApiOperation( { title: '获取菜单列表'} )
	async get(
		@Res() res ,
		@Query('id') id: string
	) {
		try {
			const ids = id.split(',') as any  ;
			return res.status( HttpStatus.OK ).send( await this.service.get( ids ) ) ;
		} catch (e) {
			return res.status(HttpStatus.OK).send( Response.error( { message : '查询参数错误' })) ;
		}
	}

	@Delete( urlPrefix + '/:id' )
	@ApiResponse({ status: 200 , description : '成功' , type : {} })
	@ApiOperation( { title: '删除菜单'} )
	async delete(
		@Res() res ,
		@Param('id') id: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.delete( id ) ) ;
	}

	@Post( urlPrefix )
	@ApiResponse( { status: 200 , description: '成功' , type : Menu } )
	@ApiOperation( { title: '新增菜单' } )
	async post(
		@Res() res ,
		@Body() data
	) {
		const result = await this.service.post( data ) ;
		return res.status( HttpStatus.OK )
			.send( result );
	}

	@Put( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type : Menu })
	@ApiOperation( { title : '更新菜单'})
	async put(
		@Res() res ,
		@Body() data
	) {
		return res.status( HttpStatus.OK ).send( await this.service.put( data ) );
	}
}
