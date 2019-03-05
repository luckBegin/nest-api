import * as path from 'path' ;
import * as fs from 'fs' ;

export const DirUtils = {
	mkdir( dir: string , cb ?: any ): void {
		if ( fs.existsSync( dir ) ) {
			cb();
		} else {
			this.mkdir(path.dirname(dir), () => {
				fs.mkdir(dir , cb);
			});
		}
	}
};
