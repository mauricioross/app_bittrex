'use strict';

module.exports = [

	'$scope', '$state', '$constant', '$dashboard',

	function (scope, state, constant, dashboard) {

		scope.modelo = {
			markets: []
		};
		scope.expandir = expandir;

		scope.currentPage = 1; // keeps track of the current page
		scope.pageSize = 5; // holds the number of items per page

		function getMarkets() {
			let params = {};
			return dashboard.getMarkets(params, function (resp) {
				scope.modelo.markets = resp.result;
				console.log(resp);
			}, function (resp) {
				console.log(resp.Message);
			})
		};
		function getTicker(market) {
			var params = {
				market: market.MarketName
			}
			dashboard.getTicker(params, function (resp) {
				market.info = resp.result;
			}, function (resp) {
				merket.errorMessage = "Ha ocurrido un error."
			})
			console.log(params);
		};

		function expandir(market) {
			market.expanded = !market.expanded;
			getTicker(market);
		}


		getMarkets();

	}

];
