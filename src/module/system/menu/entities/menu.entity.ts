import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../../share/entities' ;

@Entity()
export class Menu extends BasicEntity {
	@ApiModelProperty( { description : '子菜单'})
	children: Menu[] ;

	@ApiModelProperty( { description : '菜单名称'})
	@Column()
	name: string ;

	@ApiModelProperty({ description : '是否启用'})
	@Column()
	enabled: number ;

	@ApiModelProperty( { description : '菜单图标'})
	@Column()
	iconClass: string ;

	@ApiModelProperty({ description : '父级ID'})
	@Column()
	parentId: number ;

	@ApiModelProperty({description : '菜单地址'})
	@Column()
	path: string ;
}
