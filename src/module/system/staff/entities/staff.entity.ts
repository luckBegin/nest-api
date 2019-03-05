import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../../share/entities' ;

@Entity()
export class Staff extends BasicEntity {
	@ApiModelProperty( { description : '登录名' } )
	@Column()
	username: string ;

	@ApiModelProperty({ description : '密码'})
	@Column()
	password: string ;

	@ApiModelProperty({ description : '真实姓名'})
	@Column()
	name: string ;

	@ApiModelProperty({ description : '备注'})
	@Column()
	remark: string ;

	@ApiModelProperty({description : '手机号'})
	@Column()
	phoneNumber: string ;

	@ApiModelProperty({ description: '部门ID'})
	@Column()
	departIds: string ;

	@ApiModelProperty({ description: '角色ID'})
	@Column()
	roleIds: string ;

	@ApiModelProperty({ description: '店铺ID'})
	@Column()
	shopIds: string ;

	@ApiModelProperty({description: '微信OPENID'})
	@Column()
	openId: string ;

	@ApiModelProperty({description: '账号状态'})
	@Column()
	status: number ;

	@ApiModelProperty({description: '登录token'})
	@Column()
	token: number ;

	@ApiModelProperty({description: 'token有效期'})
	@Column()
	tokenTime: number ;
}

export class StaffQueryParam {
	username?: string ;
	phoneNumber?: number ;
	name?: string ;
	satus?: number ;

	constructor( name: string , phoneNumber: number , username: string , stauts: number) {
		if (name) { this.name = name ; }
		if (phoneNumber) { this.phoneNumber = phoneNumber ; }
		if ( username ) { this.username = username; }
		if ( stauts ) { this.satus = stauts ; }
	}
}
