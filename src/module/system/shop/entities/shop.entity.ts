import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../../share/entities' ;

@Entity()
export class Shop extends BasicEntity {
	@ApiModelProperty( { description: '店名' })
	@Column()
	name: string ;

	@ApiModelProperty( { description: '类型 , 前端枚举'})
	@Column()
	type?: number ;

	@ApiModelProperty( { description: '纬度'})
	@Column()
	lat?: string;

	@ApiModelProperty( { description: '经度'})
	@Column()
	lng?: string ;

	@ApiModelProperty( {description: '店长'} )
	@Column()
	owner: string ;

	@ApiModelProperty( { description: '店铺联系方式'})
	@Column()
	tel: string ;

	@ApiModelProperty( { description: '地址'} )
	@Column()
	address: string ;

	@ApiModelProperty( { description: '启用'} )
	@Column()
	enabled: number ;

	@ApiModelProperty({ description: '备注'})
	@Column()
	remark: string ;
}

export class ShopQueryParam {
	name?: string ;
	type?: number ;
	
	constructor( name: string , type: number) {
		if (name) { this.name = name ; }
		if (type) { this.type = type ; }
	}
}
