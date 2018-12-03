'user strict';

/**
 * @author Mauricio Ross
 * @description Definición del submodulo app.dashboard
 */
var moduleName = 'app.dashboard';
module.exports = moduleName;

angular.module(moduleName, [
	/**
	 * dependencias:
	 */
])
.config(require('./config'));

require('./services');
require('./controllers');