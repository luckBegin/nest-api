import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../../share/entities' ;

@Entity()
export class Gallery_list extends BasicEntity {
	@ApiModelProperty( { description: '名称' })
	@Column()
	name: string ;

	@ApiModelProperty( { description: '店铺ID'})
	@Column()
	shopId?: number ;

	@ApiModelProperty( { description: '类型ID'})
	@Column()
	typeId?: number ;

	@ApiModelProperty( { description: '图片地址'})
	@Column()
	url?: string ;

	@ApiModelProperty( { description: '跳转链接'})
	@Column()
	link?: number ;

	@ApiModelProperty({ description: '备注'})
	@Column()
	remark: string ;
}
