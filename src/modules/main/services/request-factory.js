'use strict';

/**
 * 
 * @description Factory para ser utilizado como interceptor de las peticiones ajax del
 *              servicio $http, permite reconfigurar la url de request anteponiendo
 *              el host destino, de esta manera en todos los demás servicios se utiliza una url relativa.
 */

module.exports = [

	'$q', '$urlConfig',

	function(q, urlConfig){

        function joinUrl(baseUrl, url) {
            if (/^(?:[a-z]+:)?\/\//i.test(url)) {
                return url;
            }
            var joined = [baseUrl, url].join('/');
            var normalize = function (str) {
                return str
                    .replace(/[\/]+/g, '/')
                    .replace(/\/\?/g, '?')
                    .replace(/\/\#/g, '#')
                    .replace(/\:\//g, '://');
            };
            return normalize(joined);
        };

		return {
			request: function(config){
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
		}
	}

];
