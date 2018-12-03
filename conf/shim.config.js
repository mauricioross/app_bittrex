

module.exports = {
    libs: {
        angular: './node_modules/angular/angular.js'
    },
    exports: {
        angular: {
            exports: 'angular',
            depends: {
                jquery: 'jQuery'
            }
        }
    },
    excludes: [
        'font-awesome'
    ]
};