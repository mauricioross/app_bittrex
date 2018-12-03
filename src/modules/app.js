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
	require('angular-ui-router'),
	require('angular-ui-bootstrap'),
	require('angular-sanitize'),
	require('angular-animate'),

	/**
	 * sub-modulos, 
	 * si se desea usar nuevos modulos sin ruta (./...)
	 * se debe agregar configuración en conf/aliases.config.js
	 * asegurandose que la configuración no tenga conflicto con
	 * nombres de modulos en 'node_modules'
	 */
	require('./main'),
	require('./commons'),
	require('./dashboard'),
	//require('./guide')
]);