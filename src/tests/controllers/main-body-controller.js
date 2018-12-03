/**
 * @description test de ejemplo de un controller del modulo main
 */
describe('prueba de main.body-controller', function(){
	var $controller;

	/**
	 * inyectar dependencias
	 */
	beforeEach(module('app'))
	beforeEach(inject(function($injector){
		$controller = $injector.get('$controller');
	}));
	
	describe('pruebas de variables', function(){
		var $scope = {};

		/**
		 * instanciar controller y dejar la
		 * referencia del scope en $scope
		 */
		beforeEach(function(){
			$controller('main.body-controller', {
				$scope: $scope
			});
		});


		it('scope.valor1 debería ser mayor a 10', function(){
			expect($scope.valor1 > 10).toEqual(true);
		});

		it('scope.valor2 debería ser menor a 40', function(){
			expect($scope.valor2 < 40).toEqual(true);
		});

		it('scope.sumar() no debería retornar valor mayor a 50', function(){
			expect($scope.sumar() <= 50).toEqual(true);
		});
	});
});