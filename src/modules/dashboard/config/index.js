'use strict';


module.exports = [

	'$httpProvider', '$stateProvider', '$urlRouterProvider', 
	'$locationProvider',

	function(httpProvider, stateProvider, urlRouterProvider, 
		locationProvider){

		/**
		 * configuración de states
		 */
		stateProvider.state('main.dashboard', require('./state-dashboard'));

	}

];