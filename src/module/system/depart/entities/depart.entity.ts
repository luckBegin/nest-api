import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../../share/entities' ;

@Entity()
export class Depart extends BasicEntity {
	@ApiModelProperty( { description : '部门名称' })
	@Column()
	name: string ;

	@ApiModelProperty( { description : '备注' } )
	@Column()
	remark?: string ;

	@ApiModelProperty( { description : '父级ID'})
	@Column()
	parentId?: number ;
}
