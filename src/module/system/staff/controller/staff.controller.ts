import { Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query } from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { StaffService } from '../service/staff.service';
import { Staff, StaffQueryParam } from '../entities/staff.entity';
import { Response } from '../../../../share' ;
import * as md5 from 'md5' ;
const urlPrefix: string = '/system/staff' ;

@ApiUseTags('管理员控制器')
@Controller()
export class  StaffController {
	constructor(
		private readonly service: StaffService ,
	) {}

	@Get( urlPrefix )
	@ApiResponse({ status: 200 , description : '成功' , type : Staff })
	@ApiOperation( { title: '获取管理员列表'} )
	async get(
		@Res() res ,
		@Query() query: any
	) {
		const paras = new StaffQueryParam(
			query.name ,
			query.phoneNumber ,
			query.username ,
			query.status
		);
		return res.status( HttpStatus.OK ).send( await this.service.get(
			query.currentPage ,
			query.pageSize ,
			paras
		)) ;
	}

	@Post( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Staff })
	@ApiOperation( { title : '新增管理员' } )
	async post(
		@Res() res ,
		@Body() data
	) {
		if (data.roleIds) {
			data.roleIds = data.roleIds.join(',') ;
		}

		if (data.departIds) {
			data.departIds = data.departIds.join(',') ;
		}

		if ( data.password ) {
			data.password = md5(data.password) ;
		}

		return res.status( HttpStatus.OK ).send( await this.service.post(data)) ;
	}

	@Put( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Staff })
	@ApiOperation( { title : '修改管理员' } )
	async put(
		@Res() res ,
		@Body() data
	) {
		if (data.roleIds) {
			data.roleIds = data.roleIds.join(',') ;
		}

		if (data.departIds) {
			data.departIds = data.departIds.join(',') ;
		}

		if ( data.password ) {
			data.password = md5(data.password) ;
		}
		return res.status( HttpStatus.OK ).send( await this.service.put(data)) ;
	}

	@Post( urlPrefix + '/login')
	@ApiResponse( { status: 200 , description: '成功' })
	@ApiOperation( { title: '登录' })
	async login(
		@Res() res ,
		@Body() data
	) {
		if (!data.username || !data.password) {
			return res.status( HttpStatus.OK).send( Response.error( {message : '请输入用户名和密码'} )) ;
		} else {
			data.password = md5(data.password) ;

			return res.status( HttpStatus.OK).send( await this.service.login(data) ) ;
		}
	}

	@Delete( urlPrefix + '/:id')
	@ApiResponse( { status : 200 , description : '成功'} )
	@ApiOperation( { title : '删除管理员' } )
	async delete(
		@Res() res ,
		@Param('id') id: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.delete( id )) ;
	}
}
