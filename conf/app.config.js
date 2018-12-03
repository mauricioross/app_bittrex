'use strict';

module.exports = function(env){
	/**
	 * definición de ambiente,
	 * si se necesita realizar algún cambio, se debe revisar también
	 * el archivo Gruntfile.js
	 */
	var config = {
		dev: {
			HOST_API 		: 'http://localhost:54080/', //las peticiones al backend se escriben relativas api/...
			EXCLUDE_BEGIN 	: ["http://", "https://"], 	//las peticiones que comienzan con, no son modificadas por el interceptor
			EXCLUDE_END 	: ['.html', '.json'] 		//las peticiones que terminan con, no son modificadas por el interceptor
		},
		prod: {
			HOST_API 		: 'http://localhost:9002/', 
			EXCLUDE_BEGIN 	: ["http://", "https://"], 
			EXCLUDE_END 	: ['.html', '.json'] 		
		}
	};
	
	return config[env];
}