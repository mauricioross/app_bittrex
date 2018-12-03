/**
 * @description test unitaria para el servicio $requestFactory
 */
describe('Prueba de $requestFactory', function(){
    var $requestFactory;
    var $urlConfig;

    /**
     * inyectar dependencias
     */
    beforeEach(module('app'))
    beforeEach(inject(function($injector){
        $requestFactory = $injector.get('$requestFactory');
        $urlConfig = $injector.get('$urlConfig');
    }));

    describe('request', function(){
        it('debe estar definido', function(){
            expect($requestFactory.request).toBeDefined();
        });
        it('no debe modificar la url cuando comienza con uib/', function(){
            var url = 'uib/modals/default';
            var config = {
                url: url
            };
            expect($requestFactory.request(config).url).toEqual(url);;
        });
        it('no debe modificar la url si comienza con una de las exclusiones de \n\t$urlConfig.EXCLUDE_BEGIN', function(){
            var url = $urlConfig.EXCLUDE_BEGIN[0] + '/url/de/ejemplo';
            var config = {
                url: url
            };            
            expect($requestFactory.request(config).url).not.toEqual(url);
        });
        it('no debe modificar la url si termina con una de las exclusiones de \n\t$urlConfig.EXCLUDE_END', function(){
            var url = '/url/de/ejemplo' + $urlConfig.EXCLUDE_END[0];
            var config = {
                url: url
            };            
            expect($requestFactory.request(config).url).not.toEqual(url);
        });
        it('debe modificar la url anteponiendo $urlConfig.HOST_API', function(){
            var url = '/url/de/ejemplo';
            var config = {
                url: url
            };
            expect($requestFactory.request(config).url.indexOf($urlConfig.HOST_API)).toEqual(0);
        });
        it('debe agregar $urlConfig.RELEASE_NUM como queryString', function(){
            var url = '/url/de/ejemplo';
            var config = {
                url: url
            };
            expect($requestFactory.request(config).url.indexOf('_r=' + $urlConfig.RELEASE_NUM) > 0).toEqual(true);
        });
    });
});