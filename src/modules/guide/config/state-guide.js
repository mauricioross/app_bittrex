/**
 * 
 * @description configuración de vistas y controllers para
 *              el state 'guide'
 */
module.exports = {
	url: '/guide',
	abstract: true,
	views: {
		'header@': {
			templateUrl: 'modules/guide/views/header.html',
		},
		'body@': {
			templateUrl: 'modules/guide/views/body.html',
            controller: 'guide.body-controller'
		},
		'footer@':{
			templateUrl: 'modules/guide/views/footer.html'
		}
	}
}