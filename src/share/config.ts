import * as path from 'path';
export const CONFIG = {
	image: {
		uploadDir: path.resolve(__dirname, '../../image') ,
		prefix: 'http://localhost:3001'
	},
	swagger: {
		enabled: true ,
		path: 'swagger'
	},
	dataBases : {
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: 'root',
		database: 'sys',
		entities: [
			'src/**/**.entity{.ts,.js}',
		],
		synchronize: false,
	},
	port: 3001 ,
	tokenTime: 86400000 ,
	loginGuard: {
		enabled : true ,
		ignore : [
			'/system/staff/login' ,
			'/gallery/list/get/.*' ,
		]
	}
};
