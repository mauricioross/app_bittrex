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
            sprint : "="
        },
        
        link: function (scope, elem, attr, ngModel) {
           scope.lightenColor=util.lightenDarkenColor(scope.sprint.color,150);
           scope.borderColor=util.lightenDarkenColor(scope.sprint.color,50);
        }
    }
}