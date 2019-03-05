import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule , DocumentBuilder } from '@nestjs/swagger' ;
import { CONFIG } from './share/config';
async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	if (CONFIG.swagger.enabled) {
		const swaggerOpt = new DocumentBuilder()
			.setTitle('API DOC')
			.setDescription('API DOC')
			.setVersion('V1.0.0')
			.build() ;

		const document = SwaggerModule.createDocument( app , swaggerOpt ) ;
		SwaggerModule.setup( CONFIG.swagger.path , app , document ) ;
	}

	app.enableCors({
		origin : true ,
		allowedHeaders : 'jwt-token , jwt-usrId , Content-type',
		methods : 'POST , GET , PUT , DELETE'
	});

	await app.listen( CONFIG.port );
}
bootstrap()
	.catch( e => {
		console.log(e);
	});
