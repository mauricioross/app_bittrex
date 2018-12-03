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
    controller: [
        '$scope','$element',
        function(scope, element){
            var ctrl = this;
            var pikaday = null;

            ctrl.$postLink = function(){
                pikaday = new Pikaday({
                    field: element.find('input').get(0),
                    minDate: ctrl.minDate ? toDate(ctrl.minDate, false) : null,
                    maxDate: ctrl.maxDate ? toDate(ctrl.maxDate, false) : null,
                    firstDay: 1,
                    format: 'DD/MM/YYYY',
                    i18n: {
                        previousMonth : 'Siguiente',
                        nextMonth     : 'Anterior',
                        months        : ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                        weekdays      : ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
                        weekdaysShort : ['Do','Lu','Ma','Mi','Ju','Vi','Sa']
                    },
                    onClose: onClose
                });

                pikaday.setDate(toDate(ctrl.date, false));
            }

            function onClose(){
                var d = scope.date && scope.date.trim().length > 0 ? toDate(scope.date) : null;
                scope.$apply(function(){
                    ctrl.date = ctrl.stringDate ? toString(d) : d;
                    pikaday.setDate(toDate(ctrl.date));
                });
            }

            function toDate(date, defaultDate){
                if (date == null || date instanceof Date) return date;
                var d = date.split(/[-/]/);
                d = new Date(d[2]+"/"+d[1]+"/"+d[0]);
                if (isNaN(d.getDay()) || d.getFullYear() <= 1900) {
                    if (defaultDate || typeof defaultDate == 'undefined') return new Date();
                    else return null;
                }
                return d;
            }

            function toString(date){
                if (date == null) return date;
                var m = date.getMonth() + 1;
                var d = date.getDate();
                d = d > 9 ? d : '0' + d;
                m = m > 9 ? m : '0' + m;
                return d + '/' + m + '/' + date.getFullYear();
            }
        }
    ]
};