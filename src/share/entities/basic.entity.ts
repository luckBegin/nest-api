import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
export class BasicEntity extends BaseEntity {

  @ApiModelProperty( { description : '主键' } )
  @PrimaryGeneratedColumn()
  id ?: number ;

  @ApiModelProperty( { description : '创建用户'} )
  @Column()
  createUser ?: string ;

  @ApiModelProperty( { description : '创建时间' } )
  @Column()
  createTime ?: string ;
  @ApiModelProperty( { description : '更新时间' } )
  @Column()
  modifyTime ?: string ;

  @ApiModelProperty( { description : '修改用户' } )
  @Column()
  modifyUser ?: string ;
}

export class BasicTreeEntity extends BasicEntity{
	@ApiModelProperty( { description : '父级ID' } )
	@Column()
	parentId ?: number ;
}
