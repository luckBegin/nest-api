export const RegUtils = {
	isNumber( str: string ): boolean {
		const reg = /\d+/g ;
		return reg.test( str ) ;
	}
};

