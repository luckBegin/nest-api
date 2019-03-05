import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffController , StaffService , Staff } from './staff';
import { ShopController , ShopService , Shop } from './shop' ;
import { MenuController , MenuService , Menu } from './menu' ;
import { DepartController , DepartService , Depart} from './depart' ;
import { RoleController , RoleService , Role } from './role' ;

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Staff ,
			Shop ,
			Menu ,
			Depart ,
			Role ,
		])
	],
	controllers: [
		StaffController ,
		ShopController ,
		MenuController ,
		DepartController ,
		RoleController
	],
	providers: [
		StaffService,
		ShopService,
		MenuService,
		DepartService,
		RoleService,
	],
	exports : [
		StaffService,
		ShopService,
		MenuService,
		DepartService,
		RoleService,
	]
})
export class SystemModule {}
