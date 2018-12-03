(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={"HOST_API":"http://localhost:54080/","EXCLUDE_BEGIN":["http://","https://"],"EXCLUDE_END":[".html",".json"],"RELEASE_NUM":1543811907830};
},{}],2:[function(require,module,exports){
'use strict';

require('angular');
require('bootstrap');

/**
 * 	Creación de modulo 'app' e inyección de dependencias de modulos
 */
angular.module('app', [
/**
 * dependencias
 */
require('angular-ui-router'), require('angular-ui-bootstrap'), require('angular-sanitize'), require('angular-animate'),

/**
 * sub-modulos, 
 * si se desea usar nuevos modulos sin ruta (./...)
 * se debe agregar configuración en conf/aliases.config.js
 * asegurandose que la configuración no tenga conflicto con
 * nombres de modulos en 'node_modules'
 */
require('./main'), require('./commons'), require('./dashboard')]
//require('./guide')
);

},{"./commons":10,"./dashboard":20,"./main":30,"angular":"angular","angular-animate":"angular-animate","angular-sanitize":"angular-sanitize","angular-ui-bootstrap":"angular-ui-bootstrap","angular-ui-router":"angular-ui-router","bootstrap":"bootstrap"}],3:[function(require,module,exports){
'use strict';

var Pikaday = require('pikaday');

module.exports = {
    template: require('./template.tmpl'),
    bindings: {
        date: '=',
        minDate: '=',
        maxDate: '=',
        stringDate: '='
    },
    controller: ['$scope', '$element', function (scope, element) {
        var ctrl = this;
        var pikaday = null;

        ctrl.$postLink = function () {
            pikaday = new Pikaday({
                field: element.find('input').get(0),
                minDate: ctrl.minDate ? toDate(ctrl.minDate, false) : null,
                maxDate: ctrl.maxDate ? toDate(ctrl.maxDate, false) : null,
                firstDay: 1,
                format: 'DD/MM/YYYY',
                i18n: {
                    previousMonth: 'Siguiente',
                    nextMonth: 'Anterior',
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    weekdaysShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
                },
                onClose: onClose
            });

            pikaday.setDate(toDate(ctrl.date, false));
        };

        function onClose() {
            var d = scope.date && scope.date.trim().length > 0 ? toDate(scope.date) : null;
            scope.$apply(function () {
                ctrl.date = ctrl.stringDate ? toString(d) : d;
                pikaday.setDate(toDate(ctrl.date));
            });
        }

        function toDate(date, defaultDate) {
            if (date == null || date instanceof Date) return date;
            var d = date.split(/[-/]/);
            d = new Date(d[2] + "/" + d[1] + "/" + d[0]);
            if (isNaN(d.getDay()) || d.getFullYear() <= 1900) {
                if (defaultDate || typeof defaultDate == 'undefined') return new Date();else return null;
            }
            return d;
        }

        function toString(date) {
            if (date == null) return date;
            var m = date.getMonth() + 1;
            var d = date.getDate();
            d = d > 9 ? d : '0' + d;
            m = m > 9 ? m : '0' + m;
            return d + '/' + m + '/' + date.getFullYear();
        }
    }]
};

},{"./template.tmpl":4,"pikaday":"pikaday"}],4:[function(require,module,exports){
module.exports = "<input type=text ng-model=date>";

},{}],5:[function(require,module,exports){
'use strict';

angular.module('app.commons').component('ntDatepicker', require('./datepicker/datepicker.js'));

},{"./datepicker/datepicker.js":3}],6:[function(require,module,exports){
'use strict';

angular.module('app.commons').directive('uxSprint', require('./ux-sprint-directive'));
//.directive('uxPagination', require('./ux-pagination-directive'))

},{"./ux-sprint-directive":7}],7:[function(require,module,exports){
'use strict';
/**
* @author Mauricio Ross
* @description Directive de Sprint
* @example: 
* 
*/

var util = require('scripts/util');

module.exports = function () {
    return {
        restrict: "E",
        //require: "ngModel",        
        template: require('../templates/ux-sprint-directive.tmpl'),
        replace: true,
        scope: {
            sprint: "="
        },

        link: function link(scope, elem, attr, ngModel) {
            scope.lightenColor = util.lightenDarkenColor(scope.sprint.color, 150);
            scope.borderColor = util.lightenDarkenColor(scope.sprint.color, 50);
        }
    };
};

},{"../templates/ux-sprint-directive.tmpl":15,"scripts/util":33}],8:[function(require,module,exports){
'use strict';

angular.module('app.commons').filter('start', require('./start'));

},{"./start":9}],9:[function(require,module,exports){
"use strict";

module.exports = function () {

    return function (input, start) {
        if (!input || !input.length) {
            return;
        }
        start = +start;
        return input.slice(start);
    };
};

},{}],10:[function(require,module,exports){
'use strict';
'user strict';

var moduleName = 'app.commons';
module.exports = moduleName;

angular.module(moduleName, [
	/**
  * dependencias:
  */
]);

require('./components');
require('./directives');
require('./services');
require('./filter');

},{"./components":5,"./directives":6,"./filter":8,"./services":11}],11:[function(require,module,exports){
'use strict';
'user strict';

angular.module('app.commons').factory('$popup', require('./popup/popup'));

},{"./popup/popup":14}],12:[function(require,module,exports){
module.exports = "<div><div class=\"alert alert-success\"><h6 class=modal-title>Mensaje</h6></div><div class=modal-body ng-bind-html=mensaje></div><div class=modal-footer><button ng-click=volver() class=\"btn btn-primary\">Aceptar</button></div></div>";

},{}],13:[function(require,module,exports){
module.exports = "<div><div class=\"alert alert-primary\"><h6 class=modal-title>Confirme</h6></div><div class=modal-body ng-bind-html=mensaje></div><div class=modal-footer><button ng-click=aceptar() class=\"btn btn-primary\">Aceptar</button> <button ng-click=cancelar() class=\"btn btn-secundary\">Cancelar</button></div></div>";

},{}],14:[function(require,module,exports){
'use strict';

module.exports = ['$uibModal', function (_modal) {

	return {
		/**
   * @description Permite mostrar un mensaje de alerta
   * @param {object} params  objeto con los parámetros:
   * @param {string} params.message mensaje a mostrar
   * @param {function} params.onAccept función callback a ejectuar al presionar 'aceptar'
   */
		alert: function alert(params, cb) {
			if (typeof params == 'string') {
				params = { message: params };
				if (typeof cb == 'function') params.onAccept = cb;
			}
			_modal.open({
				template: require('./alert-template.tmpl'),
				windowClass: 'modal-alert',
				size: 'md',
				controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
					$scope.mensaje = params.message;
					$scope.volver = function () {
						$uibModalInstance.close();
					};
				}]
			}).result.then(function (res) {
				if (typeof params.onAccept == 'function') params.onAccept(res);
			});
		},

		/**
   * @description Permite mostrar un mensaje para confirmar
   * @param {object} params objeto con los parámetros:
   * @param {string} params.message mensaje a mostrar
   * @param {function} params.onAccept función callback a ejectuar al presionar 'aceptar'
   * @param {function} params.onCancel función callback a ejecutar al presionar 'cancelar'
   */
		confirm: function confirm(params, cbaccept, cbcancel) {
			if (typeof params == 'string') {
				params = { message: params };
				if (typeof cbaccept == 'function') params.onAccept = cbaccept;
				if (typeof cbcancel == 'function') params.onCancel = cbcancel;
			}
			_modal.open({
				template: require('./confirm-template.tmpl'),
				windowClass: 'modal-alert',
				size: 'md',
				controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
					$scope.mensaje = params.message;
					$scope.aceptar = function () {
						$uibModalInstance.close();
					};
					$scope.cancelar = function () {
						$uibModalInstance.dismiss();
					};
				}]
			}).result.then(function (res) {
				if (typeof params.onAccept == 'function') params.onAccept(res);
			}, function (res) {
				if (typeof params.onCancel == 'function') params.onCancel(res);
			});
		},

		/**
   * @description Permite levantar modal
   * @param {Object} config    objeto literal con los parámetros:
   * 
   * @param {String} config.view string que reprenta la ruta de la vista (relativa a src)
   * @param {String} config.controller array con inyección de dependecias y función del controller  
   * @param {Function} config.onClose callback de funcion close de modalInstance	
   * @param {Function} config.onDismiss callback de funcion dismiss de modalInstance	
   * @param {Object} config.params mapa de parámetros para el controller. Son obtenidos en el controller de la modal inyectando '$uibModalParams'
   * 			   	 	
   * @example
   *	{
   *		view: 'modules/.../vista.html',
   *		controller: 'controller'
   *		params: {
   *			p1: 1
   *			p2: 'string',
   *			p3: {},
   *			p4: function() {...}
   *		},
   *		onClose: function(res){
   *			console.log(res)
   *		},
   *		onDismiss: function(res){
   *			console.log(res)
   *		}
   *	} 
   * 
   * @return {object}           modalInstance
   */
		modal: function modal(config) {
			var instance = _modal.open({
				templateUrl: config.view,
				windowClass: config.size || 'large',
				controller: config.controller,
				resolve: {
					'$uibModalParams': function $uibModalParams() {
						return config.params;
					}
				}
			});
			instance.result.then(function (params) {
				if (typeof config.onClose == 'function') config.onClose(params);
			}, function (params) {
				if (typeof config.onDismiss == 'function') config.onDismiss(params);
			});
			return instance;
		}
	};
}];

},{"./alert-template.tmpl":12,"./confirm-template.tmpl":13}],15:[function(require,module,exports){
module.exports = "<div class=\"col-sm-12 col-md-3 sprint mr-3\"><div class=row><div class=\"col-md-5 nombre\" ng-style=\"{'background-color':sprint.color, 'color':'white'}\"><p>SPRINT</p><h1>{{sprint.idsprint}}</h1></div><div class=\"col-md-7 dates\" ng-style=\"{'border-color': 'transparent transparent transparent '+sprint.color}\"><div class=align-top><label class=\"d-flex justify-content-end\">Desde</label><label class=\"d-flex justify-content-end\">{{sprint.desde}}</label><label class=\"d-flex justify-content-end\">Hasta</label><label class=\"d-flex justify-content-end\">{{sprint.hasta}}</label></div></div></div><div class=\"row justify-content-center\" ng-style=\"{'background-color':sprint.color,'height':'1.8rem'}\"></div><div class=\"row tile-obj justify-content-center\" ng-style=\"{'border-color': sprint.color+' transparent transparent transparent', 'background-color':lightenColor}\"><label>Objetivos</label></div><div class=\"row objetivos\" ng-style=\"{'background-color':lightenColor}\"><ul><li ng-repeat=\"obj in sprint.objetivos\">{{obj}}</li></ul></div><div class=row><table border=1><tbody><tr ng-repeat=\"hu in sprint.hus\"><td class=text-center ng-style=\"{'background-color': sprint.color, 'height': '1rem','width': '1.5rem','border-color':borderColor, color:'white'}\">{{hu.idhu}}</td><td ng-style=\"{'font-size': '9px','border-color':'lightgray'}\">{{hu.descripcion}}</td></tr></tbody></table></div><div class=align-self-end><div class=\"row justify-content-center\" ng-style=\"{'background-color':sprint.color,'height':'1.8rem'}\"></div><div class=\"row tile-obj justify-content-center\" ng-style=\"{'border-color': sprint.color+' transparent transparent transparent', 'background-color':lightenColor}\"><label>Riesgos</label></div><div class=\"row objetivos\" ng-style=\"{'background-color':lightenColor}\"><ul><li ng-repeat=\"obj in sprint.riesgos\">{{obj}}</li></ul></div></div></div>";

},{}],16:[function(require,module,exports){
'use strict';

module.exports = ['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function (httpProvider, stateProvider, urlRouterProvider, locationProvider) {

	/**
  * configuración de states
  */
	stateProvider.state('main.dashboard', require('./state-dashboard'));
}];

},{"./state-dashboard":17}],17:[function(require,module,exports){
'use strict';

module.exports = {
	url: '/dashboard',
	views: {
		'body@': {
			templateUrl: 'modules/dashboard/views/dashboard.html',
			controller: 'dashboard.controller'
		}
	}
};

},{}],18:[function(require,module,exports){
'use strict';

module.exports = ['$scope', '$state', '$constant', '$dashboard', function (scope, state, constant, dashboard) {

	scope.modelo = {
		markets: []
	};
	scope.expandir = expandir;

	scope.currentPage = 1; // keeps track of the current page
	scope.pageSize = 5; // holds the number of items per page

	function getMarkets() {
		var params = {};
		return dashboard.getMarkets(params, function (resp) {
			scope.modelo.markets = resp.result;
			console.log(resp);
		}, function (resp) {
			console.log(resp.Message);
		});
	};
	function getTicker(market) {
		var params = {
			market: market.MarketName
		};
		dashboard.getTicker(params, function (resp) {
			market.info = resp.result;
		}, function (resp) {
			merket.errorMessage = "Ha ocurrido un error.";
		});
		console.log(params);
	};

	function expandir(market) {
		market.expanded = !market.expanded;
		getTicker(market);
	}

	getMarkets();
}];

},{}],19:[function(require,module,exports){
'use strict';

angular.module('app.dashboard').controller('dashboard.controller', require('./dashboard-controller'));

},{"./dashboard-controller":18}],20:[function(require,module,exports){
'use strict';
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
]).config(require('./config'));

require('./services');
require('./controllers');

},{"./config":16,"./controllers":19,"./services":22}],21:[function(require,module,exports){
'use strict';

module.exports = ['$http', function (http) {
    return {
        getMarkets: function getMarkets(params, success, error) {
            return http.get("https://bittrex.com/api/v1.1/public/getmarketsummaries", { params: params }).then(function (resp) {
                if (typeof success == 'function') return success(resp.data, resp.status);else return resp;
            }, function (resp) {
                if (typeof error == 'function') return error(resp.data, resp.status);else return resp;
            });
        },
        getTicker: function getTicker(params, success, error) {
            return http.get("https://bittrex.com/api/v1.1/public/getticker", { params: params }).then(function (resp) {
                if (typeof success == 'function') return success(resp.data, resp.status);else return resp;
            }, function (resp) {
                if (typeof error == 'function') return error(resp.data, resp.status);else return resp;
            });
        }
    };
}];

},{}],22:[function(require,module,exports){
'use strict';
'user strict';

/**
 * 
 * @description agrupación de todos los servicios del modulo 'app.dashboard'
 */

angular.module('app.dashboard')

//.factory('$gcAuth', require('./gc-auth'))
.factory('$dashboard', require('./dashboard-service'));

},{"./dashboard-service":21}],23:[function(require,module,exports){
'use strict';

/**
 * 
 * @description configuración del submodulo 'app.main'
 */

module.exports = ['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$uibModalProvider', function (httpProvider, stateProvider, urlRouterProvider, locationProvider, modalProvider) {

	/**
  * interceptor para request ajax
  */
	httpProvider.interceptors.push('$requestFactory');

	/**
  * configuración de states
  */
	stateProvider.state('main', require('./state-main'));

	/**
  * configuración de alias para urls de ui-router
  */
	urlRouterProvider.otherwise('/dashboard'); //TODO: configurar aquí la url por defecto

	/** 
     * configuración por defecto para modales 
     */
	modalProvider.options = {
		backdrop: 'static',
		size: 'lg'
	};
}];

},{"./state-main":24}],24:[function(require,module,exports){
'use strict';

/**
 * 
 * @description configuración de vistas y controllers para
 *              el state abstracto 'main', los demás states
 *              de los otros modulos que necesiten heredar
 *              estas vistas y controllers deben prefijarse
 *              con 'main.'
 */
module.exports = {
	abstract: true,
	views: {
		'header@': {
			templateUrl: 'modules/main/views/header.html',
			controller: 'main.header-controller'
		},
		'body@': {
			templateUrl: 'modules/main/views/body.html',
			controller: 'main.body-controller'
		},
		'footer@': {
			templateUrl: 'modules/main/views/footer.html',
			controller: 'main.footer-controller'
		}
	}
};

},{}],25:[function(require,module,exports){
'use strict';

/**
 * @description constantes principales de la aplicación.
 */
module.exports = {
  /**
   * URL_DEFECTO es la url por defecto de la aplicación,
   * las urls son configuradas en los states de <modulo>/config
   * si una url no existe, por defecto se redireccionará a esta url:
   */
  URL_DEFECTO: '/dashboard',
  /**
   * STATE_INICIAL es el state inicial, luego de la autenticación
   * los states son configurados en <modulo>/config
   */
  STATE_INICIAL: 'main.dashboard'
};

},{}],26:[function(require,module,exports){
'use strict';

module.exports = ['$scope', function (scope) {}];

},{}],27:[function(require,module,exports){
'use strict';

module.exports = ['$scope', function (scope) {

	console.log('main - footer controller');
}];

},{}],28:[function(require,module,exports){
'use strict';

module.exports = ['$scope', function (scope) {

	console.log('main - header controller');
}];

},{}],29:[function(require,module,exports){
'use strict';

/**
 * 
 * @description agrupación de todos los controllers del modulo 'app.main'
 */

angular.module('app.main').controller('main.header-controller', require('./header-controller')).controller('main.body-controller', require('./body-controller')).controller('main.footer-controller', require('./footer-controller'));

},{"./body-controller":26,"./footer-controller":27,"./header-controller":28}],30:[function(require,module,exports){
'use strict';
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
]).constant('$urlConfig', require('root/bundle/conf/url-config.cfg')).constant('$constant', require('./constants/main-constant')).config(require('./config'));

/**
 * inclusión de componentes
 */
require('./services');
require('./controllers');

},{"./config":23,"./constants/main-constant":25,"./controllers":29,"./services":31,"root/bundle/conf/url-config.cfg":1}],31:[function(require,module,exports){
'use strict';

/**
 * 
 * @description agrupación de todos los servicios del modulo 'app.main'
 */

angular.module('app.main').factory('$requestFactory', require('./request-factory'));

},{"./request-factory":32}],32:[function(require,module,exports){
'use strict';

/**
 * 
 * @description Factory para ser utilizado como interceptor de las peticiones ajax del
 *              servicio $http, permite reconfigurar la url de request anteponiendo
 *              el host destino, de esta manera en todos los demás servicios se utiliza una url relativa.
 */

module.exports = ['$q', '$urlConfig', function (q, urlConfig) {

    function joinUrl(baseUrl, url) {
        if (/^(?:[a-z]+:)?\/\//i.test(url)) {
            return url;
        }
        var joined = [baseUrl, url].join('/');
        var normalize = function normalize(str) {
            return str.replace(/[\/]+/g, '/').replace(/\/\?/g, '?').replace(/\/\#/g, '#').replace(/\:\//g, '://');
        };
        return normalize(joined);
    };

    return {
        request: function request(config) {
            /**
                         * saltar la configuración defecto de ui-bootstrap
                         * ya que va a buscar templates predefinidas en ruta 'uib/'
                         */
            if (config.url.indexOf('uib/') == 0) return config || q.when(config);

            for (var i = 0; i < urlConfig.EXCLUDE_BEGIN.length; i += 1) {
                if (config.url.indexOf(urlConfig.EXCLUDE_BEGIN[i]) === 0) {
                    config.url += '?_r=' + urlConfig.RELEASE_NUM;
                    return config || q.when(config);
                }
            }
            for (var i = 0; i < urlConfig.EXCLUDE_END.length; i += 1) {
                if (config.url.lastIndexOf(urlConfig.EXCLUDE_END[i]) === config.url.length - urlConfig.EXCLUDE_END[i].length) {
                    config.url += '?_r=' + urlConfig.RELEASE_NUM;
                    return config || q.when(config);
                }
            }

            config.url = joinUrl(urlConfig.HOST_API, config.url + '?_r=' + urlConfig.RELEASE_NUM);
            return config || q.when(config);
        }
    };
}];

},{}],33:[function(require,module,exports){
'use strict';
/**
 * @description script con métodos de utilidad, deben ser atomicos y genéricos
 */

module.exports = {
   date: _date,
   lightenDarkenColor: _lightenDarkenColor
};

/**
 * @description Permite transformar una fecha en objeto Date
 * @param  {string} input  	string que representa una fecha ('dia/mes/año')
 * @return {object}         Date
 */
function _date(input) {
   if (input == null || input instanceof Date) return input;
   input = input.replace(/-/g, "/").split("/");
   input = new Date(input[1] + "/" + input[0] + "/" + input[2]);
   if (isNaN(input.getDay()) || input.getFullYear() <= 1900) input = null;
   return input;
}

/**
 * @author: Mauricio Ross (implementacion).
 * @description : Agrega tonalidad a un color, mas detalle en:  https://css-tricks.com/snippets/javascript/lighten-darken-color/
 * @param {*} col 
 * @param {*} amt 
 */
function _lightenDarkenColor(col, amt) {

   var usePound = false;

   if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
   }

   var num = parseInt(col, 16);

   var r = (num >> 16) + amt;

   if (r > 255) r = 255;else if (r < 0) r = 0;

   var b = (num >> 8 & 0x00FF) + amt;

   if (b > 255) b = 255;else if (b < 0) b = 0;

   var g = (num & 0x0000FF) + amt;

   if (g > 255) g = 255;else if (g < 0) g = 0;

   return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
}

},{}]},{},[2])
//# sourceMappingURL=app.js.map
