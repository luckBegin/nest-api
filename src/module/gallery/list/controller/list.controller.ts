import { Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query, } from '@nestjs/common';
import { UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { ListService } from '../service/list.service';
import { Gallery_list } from '../entities/list.entity';
import { diskStorage } from 'multer';
import { CONFIG } from '../../../../share/config';
import { DateUtils } from '../../../../share/utils';
import { DirUtils } from '../../../../share/utils/dir.utils';
import * as path from 'path';
import { Response } from '../../../../share/response' ;

const urlPrefix: string = '/gallery/list' ;
@ApiUseTags('图片列表控制器')
@Controller()
export class  ListController {
	constructor(
		private readonly service: ListService ,
	) {}

	@Get( urlPrefix )
	@ApiResponse({ status: 200 , description : '成功' , type : Gallery_list })
	@ApiOperation( { title: '获取图片列表'} )
	async get(
		@Res() res ,
		@Query() query: any
	) {
		return res.status( HttpStatus.OK ).send( await this.service.get(
			query.currentPage ,
			query.pageSize
		)) ;
	}

	@Post( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Gallery_list } )
	@ApiOperation( { title : '新增图片' } )
	@UseInterceptors( FileInterceptor('file' , {
		storage: diskStorage({
			destination: ( data , file , cb ) => {
				const postData = data.body ;
				const folder = DateUtils.getNow(false , 'y-m-d').toString() + '/' + postData.shopId + '/' + postData.typeId ;
				const dirPath = path.resolve(
					CONFIG.image.uploadDir ,
					folder
				);
				DirUtils.mkdir(dirPath , () => {
					cb( null , dirPath) ;
				});
				data.body.url = folder ;
			},
			filename: ( data , file , cb ) => {
				const postData = data.body ;
				const fileName = postData.time + postData.shopId + postData.typeId + path.extname(file.originalname) ;
				cb( null , `${fileName}`) ;
			}
		})
	}))
	async post(
		@Res() res ,
		@Body() data ,
		@UploadedFile() file
	) {
		data.url += '/' + data.time + data.shopId + data.typeId + path.extname(file.originalname) ;
		return res.status( HttpStatus.OK ).send( await this.service.post(data)) ;
	}

	@Put( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Gallery_list } )
	@ApiOperation( { title : '修改图片' } )
	async put(
		@Res() res ,
		@Body() data
	) {
		return res.status( HttpStatus.OK ).send( await this.service.put(data)) ;
	}

	@Delete( urlPrefix + '/:id')
	@ApiResponse( { status : 200 , description : '成功'} )
	@ApiOperation( { title : '删除图片' } )
	async delete(
		@Res() res ,
		@Param('id') id: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.delete( id )) ;
	}

	@Get( urlPrefix + '/get/:fileName')
	@ApiResponse({ status: 200 , description : '成功' , type : Gallery_list })
	@ApiOperation( { title: '获取图片'} )
	async getImage(
		@Res() res ,
		@Query() query: any ,
		@Param() para: any
	) {
		const filePath = Buffer.from(para.fileName , 'base64').toString() ;

		const quality = query.q ? Number(query.q) : 100 ;

		try {
			const size = query.s ? query.s.split(',').map( item => Number( item )) : [ null , null ] ;
			const imageData = await this.service.getImg( path.resolve(
				CONFIG.image.uploadDir , filePath
			) , quality , size) ;
			return res
				.status( HttpStatus.OK )
				.set('Content-type' , 'image/jpeg')
				.send( imageData );
		} catch (e) {
			console.log(e);
			return res
				.status( HttpStatus.OK )
				.send( Response.error({ code: 400 , message : 'invalid param' }) );
		}
	}
}
