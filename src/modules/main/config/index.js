'use strict';

/**
 * 
 * @description configuración del submodulo 'app.main'
 */
module.exports = [

	'$httpProvider', '$stateProvider', '$urlRouterProvider', 
	'$locationProvider', '$uibModalProvider',

	function(httpProvider, stateProvider, urlRouterProvider, 
		locationProvider, modalProvider){

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
	}

];