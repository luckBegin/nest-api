import { Repository } from 'typeorm' ;
import { BasicTreeEntity } from '../entities';
import { Response } from '../response' ;

class QueryBuilder {
	public async query(
		page: { size: number , page: number } , query: any,
		target: Repository < BasicTreeEntity >  , columns?: string
	): Promise< any > {
		const builder = target
				.createQueryBuilder()
				.where( query )
				.take(page.size)
				.skip( ( page.page - 1 ) * page.size);

		let result = null ;
		let total = null ;

		if ( columns ) {
			builder.select(columns) ;
			total = await builder.getCount() ;
			result = await builder.getRawMany() ;
		} else {
			[ result , total ] = await builder.getManyAndCount() ;
		}

		const Page = Response.page( page.size , total , Math.ceil( total / page.size ));
		return Response.success( { data: result , page: Page }) ;
	}
}

export const QueryBuilderService = new QueryBuilder() ;
