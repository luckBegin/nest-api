import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../../share/entities' ;

@Entity()
export class Role extends BasicEntity {
	@ApiModelProperty({ description: '角色名'})
	@Column()
	name: string ;

	@ApiModelProperty({ description: '备注'})
	@Column()
	remark: string ;

	@ApiModelProperty({ description: '店铺ID'})
	@Column()
	shopId: number ;

	@ApiModelProperty({ description: '权限ID组'})
	@Column()
	menuIds: string ;
}

export class RoleQueryParam {
	shopId?: number ;
	constructor( shopId: number) {
		if (shopId) { this.shopId = shopId ; }
	}
}
