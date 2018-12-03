
module.exports = [
	'$uibModal',
	function(modal){

		return {
			/**
			 * @description Permite mostrar un mensaje de alerta
			 * @param {object} params  objeto con los parámetros:
			 * @param {string} params.message mensaje a mostrar
			 * @param {function} params.onAccept función callback a ejectuar al presionar 'aceptar'
			 */
			alert: function(params, cb){
				if (typeof params == 'string') {
					params = { message: params };
					if (typeof cb == 'function') params.onAccept = cb;
				}
				modal.open({
					template: require('./alert-template.tmpl'),
					windowClass: 'modal-alert',
					size: 'md',
	                controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){
	                	$scope.mensaje = params.message;
	                	$scope.volver = function(){
	                		$uibModalInstance.close();
	                	}
	                }]
				}).result.then(function(res){
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
			confirm: function(params, cbaccept, cbcancel){
				if (typeof params == 'string') {
					params = { message: params };
					if (typeof cbaccept == 'function') params.onAccept = cbaccept;
					if (typeof cbcancel == 'function') params.onCancel = cbcancel;
				}
				modal.open({
					template: require('./confirm-template.tmpl'),
					windowClass: 'modal-alert',
					size: 'md',
	                controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){
	                	$scope.mensaje = params.message;
	                	$scope.aceptar = function(){
	                		$uibModalInstance.close();
	                	};
	                	$scope.cancelar = function(){
	                		$uibModalInstance.dismiss();
	                	};
	                }]
				}).result.then(function(res){
					if (typeof params.onAccept == 'function') params.onAccept(res);
				}, function(res){
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
			modal: function(config){
				var instance = modal.open({
					templateUrl: config.view,
					windowClass: config.size || 'large',
	                controller: config.controller,
	                resolve: {
	                    '$uibModalParams': function () {
	                        return config.params;
						}
	                }
				});
				instance.result.then(function(params){
					if (typeof config.onClose == 'function') config.onClose(params);
				}, function(params){
					if (typeof config.onDismiss == 'function') config.onDismiss(params);
				});
				return instance;
			}
		}

	}

];