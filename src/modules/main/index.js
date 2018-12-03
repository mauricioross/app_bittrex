'user strict';

/**
 * 
 * @description Definición del submodulo app.main
 */
var moduleName = 'app.main';
module.exports = moduleName;

angular.module(moduleName, [
	/**
	 * dependencias:
	 */
])
.constant('$urlConfig', require('root/bundle/conf/url-config.cfg'))
.constant('$constant', require('./constants/main-constant'))
.config(require('./config'));

/**
 * inclusión de componentes
 */
require('./services');
require('./controllers');