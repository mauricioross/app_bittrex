'use strict';

/**
 * 
 * @description configuración del submodulo 'app.home'
 */
module.exports = [

	'$httpProvider', '$stateProvider', '$urlRouterProvider', 
	'$locationProvider',

	function(httpProvider, stateProvider, urlRouterProvider, 
		locationProvider){

		/**
		 * configuración de states
		 */
		stateProvider
		.state('guide', require('./state-guide'))
		.state('guide.home', require('./state-guide-home'))
		.state('guide.tipografias', require('./state-guide-tipografias'))
		.state('guide.colores', require('./state-guide-colores'))
		.state('guide.tablas', require('./state-guide-tablas'))
		
		urlRouterProvider.otherwise('/guide/home');
	}

];