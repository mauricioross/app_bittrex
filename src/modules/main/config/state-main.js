/**
 * 
 * @description configuración de vistas y controllers para
 *              el state abstracto 'main', los demás states
 *              de los otros modulos que necesiten heredar
 *              estas vistas y controllers deben prefijarse
 *              con 'main.'
 */
module.exports = {
	abstract: true,
	views: {
		'header@': {
			templateUrl: 'modules/main/views/header.html',
            controller: 'main.header-controller'
		},
		'body@': {
			templateUrl: 'modules/main/views/body.html',
            controller: 'main.body-controller'
		},
		'footer@': {
			templateUrl: 'modules/main/views/footer.html',
            controller: 'main.footer-controller'
		}
	}
}