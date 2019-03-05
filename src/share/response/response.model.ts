export  class ResponseModel{
	code : number = 200 ;
	message : string = null ;
	success : boolean = null ;
	data : any  = null ;
	page : Page = null ;

	constructor(){

	};

	build(key :  'code' | 'message' |  'success' | 'data' | 'page' , val : any = ''){
		if(key)
			this[key] = val ;
		return this ;
	};
}
class Page {
	pageSize: number
	totalNumber: number
	totalPage: number ;

	constructor( pageSize : number , totalNumber : number , totalPage : number ){
		this.pageSize = pageSize ;
		this.totalNumber = totalNumber ;
		this.totalPage = totalPage ;
	};
};

export class Response {

	private static buildRes ( data : ResponseModel ) : ResponseModel {
		const model =  new ResponseModel()

		if( data && data.code)
			model.build("code" , data.code) ;

		if(data && data.page)
			model.build("page" , data.page) ;

		if(data && data.message)
			model.build("message" , data.message) ;

		if(data && data.page)
			model.build("page" , data.page ) ;

		if(data && data.data)
			model.build("data" , data.data) ;
		return model ;
	};

	static success : Function = function( data : ResponseModel ) : ResponseModel {
		const response = Response.buildRes(data)
			.build("success" , true )
		return response ;
	};

	static error : Function = function ( data : ResponseModel )  : ResponseModel {
		const response = Response.buildRes(data)
			.build("success" , false )
		return response;
	};

	static page : Function = function( pageSize : number = 0 , totalNumber : number =  0 , totalPage : number = 0  ) : Page {
		return new Page(pageSize , totalNumber , totalPage )
	};
};