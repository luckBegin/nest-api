import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule , GalleryModule } from './module' ;
import { CONFIG } from './share/config';
import { APP_GUARD } from '@nestjs/core';
import { LoginGurad } from './guard';

const modules = [
	SystemModule ,
	GalleryModule
];

@Module({
	imports: [ ...modules , TypeOrmModule.forRoot( CONFIG.dataBases as any )],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: LoginGurad,
		},
	],
})
export class AppModule {}
