'use strict';
/**
 * @description script con métodos de utilidad, deben ser atomicos y genéricos
 */
module.exports = {
    date        : _date,
    lightenDarkenColor:_lightenDarkenColor
};

/**
 * @description Permite transformar una fecha en objeto Date
 * @param  {string} input  	string que representa una fecha ('dia/mes/año')
 * @return {object}         Date
 */
function _date(input){
    if (input == null || input instanceof Date) return input;
    input = input.replace(/-/g,"/").split("/");
    input = new Date(input[1]+"/"+input[0]+"/"+input[2]);
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
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}