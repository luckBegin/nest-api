import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeService , TypeController , Gallery_type } from './type' ;
import { Gallery_list , ListService , ListController } from './list';
import { SystemModule } from '../system';
@Module({
	imports: [
		TypeOrmModule.forFeature([
			Gallery_type ,
			Gallery_list
		]),
		SystemModule
	],
	controllers: [
		TypeController ,
		ListController
	],
	providers: [
		TypeService ,
		ListService ,
	],
	exports : [
		TypeService
	]
})
export class GalleryModule {}
