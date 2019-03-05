import { Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query } from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { DepartService } from '../service/depart.service';
import { Depart } from '../entities/depart.entity';

const urlPrefix: string = '/system/department' ;

@ApiUseTags('部门控制器')
@Controller()
export class  DepartController {
	constructor(
		private readonly service: DepartService ,
	) {}

	@Get( urlPrefix + '/tree')
	@ApiResponse({ status: 200 , description : '成功' , type : Depart })
	@ApiOperation( { title: '获取部门列表'} )
	async get(
		@Res() res ,
	) {
		return res.status( HttpStatus.OK ).send( await this.service.get() ) ;
	}

	@Delete(  urlPrefix + '/:id')
	@ApiResponse({ status: 200 , description : '成功' })
	@ApiOperation( { title: '删除部门'} )
	async delete(
		@Res() res ,
		@Param('id') id: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.delete( id ) ) ;
	}

	@Post( urlPrefix )
	@ApiResponse( { status: 200 , description: '成功' , type : Depart } )
	@ApiOperation( { title: '新增部门' } )
	async post(
		@Res() res ,
		@Body() data
	) {
		const result = await this.service.post( data ) ;
		return res.status( HttpStatus.OK )
			.send( result );
	}

	@Put( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Depart })
	@ApiOperation( { title : '更新部门'})
	async put(
		@Res() res ,
		@Body() data
	) {
		return res.status( HttpStatus.OK ).send( await this.service.put( data ) );
	}
}
