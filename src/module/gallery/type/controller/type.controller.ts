import { Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query } from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { TypeService } from '../service/type.service';
import { Gallery_type } from '../entities/type.entity';

const urlPrefix: string = '/gallery/type' ;

@ApiUseTags('图片类型控制器')
@Controller()
export class  TypeController {
	constructor(
		private readonly service: TypeService ,
	) {}

	@Get( urlPrefix )
	@ApiResponse({ status: 200 , description : '成功' , type : Gallery_type })
	@ApiOperation( { title: '获取类型列表'} )
	async get(
		@Res() res ,
		@Query() query: any
	) {
		return res.status( HttpStatus.OK ).send( await this.service.get(
			query.currentPage ,
			query.pageSize
		)) ;
	}

	@Get( urlPrefix + '/all')
	@ApiResponse({ status: 200 , description : '成功' , type : Gallery_type })
	@ApiOperation( { title: '获取所有类型'} )
	async getAll(
		@Res() res ,
		@Query() query: any
	) {
		return res.status( HttpStatus.OK ).send( await this.service.getAll()) ;
	}
	
	@Post( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Gallery_type } )
	@ApiOperation( { title : '新增类型' } )
	async post(
		@Res() res ,
		@Body() data
	) {
		return res.status( HttpStatus.OK ).send( await this.service.post(data)) ;
	}

	@Put( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Gallery_type } )
	@ApiOperation( { title : '修改类型' } )
	async put(
		@Res() res ,
		@Body() data
	) {
		return res.status( HttpStatus.OK ).send( await this.service.put(data)) ;
	}

	@Delete( urlPrefix + '/:id')
	@ApiResponse( { status : 200 , description : '成功'} )
	@ApiOperation( { title : '删除类型' } )
	async delete(
		@Res() res ,
		@Param('id') id: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.delete( id )) ;
	}
}
