import { Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query } from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { ShopService } from '../service/shop.service';
import { Shop, ShopQueryParam } from '../entities/shop.entity';
const urlPrefix: string = '/system/shop' ;
@ApiUseTags('店铺控制器')
@Controller()
export class  ShopController {
	constructor(
		private readonly service: ShopService ,
	) {}

	@Get( urlPrefix )
	@ApiResponse({ status: 200 , description : '成功' , type : Shop })
	@ApiOperation( { title: '获取店铺列表'} )
	async get(
		@Res() res ,
		@Query() query: any
	) {
		const paras = new ShopQueryParam( query.name , query.type ) ;
		return res.status( HttpStatus.OK ).send( await this.service.get(
			query.currentPage ,
			query.pageSize ,
			paras
		)) ;
	}

	@Get( urlPrefix + '/all')
	@ApiResponse({ status: 200 , description : '成功' , type : Shop })
	@ApiOperation( { title: '获取所有店铺'} )
	async getAll(
		@Res() res ,
		@Query() query: any
	) {
		const paras = new ShopQueryParam( query.name , query.type ) ;
		return res.status( HttpStatus.OK ).send( await this.service.getAll()) ;
	}
	
	@Post( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Shop } )
	@ApiOperation( { title : '新增店铺' } )
	async post(
		@Res() res ,
		@Body() data
	) {
		return res.status( HttpStatus.OK ).send( await this.service.post(data)) ;
	}

	@Put( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Shop} )
	@ApiOperation( { title : '修改店铺' } )
	async put(
		@Res() res ,
		@Body() data
	) {
		return res.status( HttpStatus.OK ).send( await this.service.put(data)) ;
	}

	@Delete( urlPrefix + '/:id')
	@ApiResponse( { status : 200 , description : '成功'} )
	@ApiOperation( { title : '删除店铺' } )
	async delete(
		@Res() res ,
		@Param('id') id: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.delete( id )) ;
	}
}
