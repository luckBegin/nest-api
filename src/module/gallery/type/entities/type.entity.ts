import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../../share/entities' ;

@Entity()
export class Gallery_type extends BasicEntity {
	@ApiModelProperty( { description: '名称' })
	@Column()
	name: string ;

	@ApiModelProperty( { description: '店铺ID'})
	@Column()
	shopId?: number ;

	@ApiModelProperty({ description: '备注'})
	@Column()
	remark: string ;
}
