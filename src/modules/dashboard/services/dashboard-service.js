'use strict';

module.exports = [
    '$http',
    function (http) {
        return {
            getMarkets: function (params, success, error) {
                return http.get("https://bittrex.com/api/v1.1/public/getmarketsummaries", { params: params })
                    .then(function (resp) {
                        if (typeof success == 'function') return success(resp.data, resp.status);
                        else return resp;
                    }, function (resp) {
                        if (typeof error == 'function') return error(resp.data, resp.status);
                        else return resp;
                    });
            },
            getTicker: function (params, success, error) {
                return http.get("https://bittrex.com/api/v1.1/public/getticker", { params: params })
                    .then(function (resp) {
                        if (typeof success == 'function') return success(resp.data, resp.status);
                        else return resp;
                    }, function (resp) {
                        if (typeof error == 'function') return error(resp.data, resp.status);
                        else return resp;
                    });
            }
        }
    }
]