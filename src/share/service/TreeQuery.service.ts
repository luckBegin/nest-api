import { Repository } from 'typeorm' ;
import { BasicTreeEntity } from '../entities';
class TreeQuerySer {

	private getChild( id: number , target: Repository< BasicTreeEntity > , parent: any): Promise < any[] > {
		return new Promise( ((resolve, reject) => {
			target.find( { parentId : id })
				.then( childItem  => {
					parent.children = childItem ;
					this.recursive( childItem , target )
						.then( data => {
							resolve( parent ) ;
						})
						.catch( e => reject(e)) ;
				})
				.catch( e => {
					reject(e) ;
				});
		}));
	}

	private recursive( item: any[] , target: Repository< BasicTreeEntity >  ): Promise<any> {
		return Promise.all( item.map( ( data ) => {
			return this.getChild( data.id , target , data  ) ;
		}));
	}

	async getByIds( target: Repository< BasicTreeEntity > , parentIds: number[] ) {
		return target.findByIds(  parentIds  ) ;
	}

	async getByParentId( target: Repository< BasicTreeEntity > ) {
		return target.find( { parentId : 0 }) ;
	}

	async getTree( target: Repository< BasicTreeEntity > , byParentId: boolean , ids: number[] = [0] ) {
		let parentItem: any = null ;

		if ( byParentId ) {
			parentItem = await this.getByParentId( target ) ;
		} else {
			parentItem = await this.getByIds( target , ids ) ;
		}

		return new Promise( ((resolve, reject) => {
			this.recursive( parentItem , target )
				.then( data => {
					resolve(data) ;
				})
				.catch( e => {
					reject(e) ;
				});
		}));
	}
}
export const TreeQueryService = new TreeQuerySer() ;
