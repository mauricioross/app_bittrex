'user strict';

/**
 * 
 * @description Definición del submodulo app.guide
 */
var moduleName = 'app.guide';
module.exports = moduleName;

angular.module(moduleName, [
	/**
	 * dependencias:
	 */
])
.config(require('./config'));

require('./controllers');