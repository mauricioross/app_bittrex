'use strict';

/**
 * 
 * @description agrupación de todos los controllers del modulo 'app.main'
 */
angular.module('app.main')

.controller('main.header-controller', require('./header-controller'))
.controller('main.body-controller', require('./body-controller'))
.controller('main.footer-controller', require('./footer-controller'))
