
module.exports = function(grunt){
	
		require('load-grunt-tasks')(grunt);
	
		var pkg = grunt.file.readJSON('package.json');
		var publishConfig = require('./conf/publish.config');
		var portscanner = require('portscanner');
		var browserify = require('browserify');
		var exorcist = require('exorcist');
		var serveStatic = require('serve-static');
		var pathmodify = require('pathmodify');
		var fs = require('fs');
		var path = require('path');
	
		var time = (new Date()).getTime();
	
		//por defecto el ambiente es dev.
		var env = 'dev'; 
	
		/**
		 * generar array de dependecias de terceros
		 * para un bundle separado y evitar sus compilaciones
		 */
		var libs = Object.keys(pkg.dependencies || {});
		var shim = require('./conf/shim.config');
		var shimlibs = Object.keys(shim.libs || {});

		/** 
		 * directorios personalizados 
		 */ 
		var customPath = require('./conf/custom-path.config'); 
		var customDirDist = []; 
		var fixPath = function(input){ 
			return input.replace(/[\\/]+/g,'/').replace(/\/$/,''); 
		}; 
		Object.keys(customPath).forEach(function(path){ 
			var virtual = fixPath(customPath[path]); 
			virtual = /^\//.test(virtual) ? virtual : '/' + virtual; 
			customDirDist.push({ 
				expand: true, 
				dot: true, 
				cwd: path, 
				dest: publishConfig.path + virtual, 
				src: ['**']
			}); 
		});

		/**
		 * configuración de alias con pathmodify
		 */
		var aliases = require('./conf/aliases.config');
		var modsAliases = [
			pathmodify.mod.dir('root', __dirname)
		];
		for (var k in aliases){
			modsAliases.push(pathmodify.mod.dir(k, path.join(__dirname, aliases[k])))
		}
		modsAliases = {
			mods: modsAliases
		};
		
		/**
		 * Busca un puerto disponible para livereload
		 */
		var liveReload_port = 35720;
		var liveReload_maxPort = 35750;
		var findPort = function(callback) {
			portscanner.findAPortNotInUse(liveReload_port, liveReload_maxPort, '127.0.0.1', callback);
		};
	
		grunt.initConfig({
			distPath: publishConfig.path,
			connect: {
				options: {
					livereload: false,
					hostname: 'localhost'
				},
				dev: {
					options: {
						open: true,
						useAvailablePort: true,
						middleware: function(connect, options, middlewares) {
							var serves = [ 
								serveStatic('src'), 
								serveStatic('bundle'),
								connect().use('/css', serveStatic('src/styles')), 
								connect().use('/src', serveStatic('src/')) 
							]; 
							Object.keys(customPath).forEach(function(path){ 
								var virtual = fixPath(customPath[path]); 
								virtual = /^\//.test(virtual) ? virtual : '/' + virtual; 
								serves.push(connect().use(virtual, serveStatic(path))); 
							}); 
							return serves;
						}
					}
				},
				dist: {
					options: {
						livereload: false,
						keepalive: true,
						open: true,
						useAvailablePort: true,
						base: {
							path: publishConfig.path,
							options: {
								index: 'index.html'
							}
						}
					}
				}
			},
	
			watch: {
				options: {			
					debounceDelay: 250,	
					event: ['changed', 'added', 'deleted'],
				},
				bundle: {
					options: {
						livereload: false,
						interrupt: true,
						spawn: false,
					},
					files: ['bundle/js/app.js', 'bundle/css/app.css', 'src/**/*.html']
				},
				scripts: {
					files: ['src/modules/**/*.js','src/scripts/**/*.js', 'src/**/*.tmpl'],
					tasks: ['browserify-app']
				},
				sass: {
					files: ['src/**/*.scss'],
					tasks: ['sass:dev']
				},
				config: {
					files: ['conf/app.config.js'],
					tasks: ['write-env','browserify-app']
				},
			},
	
			clean: {
				options: {
					force: true
				},
				dist: [publishConfig.path],
			},
	
			copy: {
				app: {
					expand: true,
					dot: true,
					cwd: 'src',
					dest: publishConfig.path,
					src: ['**','!**/*.js','!bundle/**','!styles/**']
				},
				bundles: {
					expand: true,
					dot: true,
					cwd: 'bundle',
					dest: publishConfig.path,
					src: ['js/**/*.js', 'css/**/*.css']
				},
				styles_dist: {
					expand: true,
					dot: true,
					cwd: 'src/styles',
					dest: publishConfig.path + '/css/',
					src: ['**','!sass/**']
				},
				custom: { 
					files: customDirDist 
				} 
			},
	
			sass: {                              
				dev: {                           
					options: {              
						includePaths: require('./conf/sass-path.config'),        
						outputStyle: 'expanded',
						sourceMap: true,
						sourceMapContents: true 
					},
					src: ['src/styles/sass/main.scss'],
					dest: 'bundle/css/app.css'
				},
				dist: {
					options: {
						includePaths: require('./conf/sass-path.config'),        
						outputStyle: 'compressed',
						sourceMap: true,
						sourceMapContents: true
					},
					src: ['src/styles/sass/main.scss'],
					dest: publishConfig.path + '/css/app.min.css'
				}
			},
	
			uglify: {
				dist: {
					options: {
						sourceMap: true,
						sourceMapIncludeSources: true,
						banner: '/*! ' + pkg.name + ' - ' + grunt.template.today("yyyy-mm-dd") + ' @author '+ pkg.author +'*/\n'
					},
					files: {
						'<%= distPath %>/js/libs.min.js' : publishConfig.path + '/js/libs.js',
						'<%= distPath %>/js/app.min.js' : publishConfig.path + '/js/app.js',
					}
				}
			},
	
			cleanempty: {
				options: {
					files: false,
					force: true,
				  },
				  dist: [publishConfig.path + '/**/*'],
			},
	
			'string-replace': {
				dist: {
					options: {
						replacements: [
							{
								pattern: /<!--\s*?bundle:(js|css)\s*?-->[\s\S]*?<!--\s*?endbundle\s*?-->/gm,
								replacement: function(match, scripts) {
									var tag = match.indexOf('bundle:js') > 0 
										? '<script src="js/libs.min.js?_r='+ time +'"></script>\n\t<script src="js/app.min.js?_r='+ time +'"></script>'
										: '<link rel="stylesheet" type="text/css" href="css/app.min.css?_r='+ time +'">';
									return tag;
								}
							}
						]
					},
					files: {
						'<%= distPath %>/index.html': publishConfig.path + '/index.html'
					}
				}
			}
	
		});
	
		grunt.registerTask('browserify-libs', 'genera un bundle de las dependencias de terceros', function(){
			var done = this.async();
			var dir = './bundle/js';
			var b = browserify();
			var reqs = [].concat(libs);
			var excludes = shim.excludes || []; 
	
			var handleError = function(err){
				if (!err) return;
				grunt.log.error(err);
				done(false);
			};
	
			if (!fs.existsSync(dir)) fs.mkdirSync(dir);
			
			if (shimlibs.length > 0 && shim.exports) {
				b.transform('browserify-shim', {
					global: true
				});
				
				shimlibs.forEach(function(lib){
					var i = reqs.indexOf(lib);
					var expose = shim.exports[lib];
					var modulePath = shim.libs[lib];
	
					if (i >= 0) reqs.splice(i, 1);
					else {
						if (/node_modules/i.test(modulePath)){
							i = reqs.indexOf(/node_modules[\\/](.*?)[\\/]/i.exec(modulePath)[1]);
							reqs.splice(i, 1);
						}
					}
					b.require(require.resolve(shim.libs[lib]), {
						expose: typeof expose == 'string' ? expose : expose.exports
					}) 
				});
			}

			excludes.forEach(function(e){ 
				var r = reqs.indexOf(e); 
				if (r >= 0) reqs.splice(r, 1); 
			}); 
	
			b.require(reqs)
			.bundle(handleError)
			.pipe(fs.createWriteStream(path.join(__dirname, dir, 'libs.js'), 'utf8'))
			.on('finish', done);
		});
	
		grunt.registerTask('browserify-app', 'genera un bundle de la aplicación', function(){
			var done = this.async();
			var dir = './bundle/js';
			var mapFilePath = path.join(__dirname, dir, 'app.js.map');
	
			var handleError = function(err){
				if (!err) return;
				grunt.log.error(err);
				done(false);
			};

			if (!fs.existsSync(dir)) fs.mkdirSync(dir);
	
			if (shimlibs.length > 0 && shim.exports){
				shimlibs.forEach(function(lib){
					var expose = shim.exports[lib];
					expose = typeof expose == 'string' ? expose : expose.exports
					if (libs.indexOf(expose) < 0) libs.push(expose);
				});
			}
	
			browserify({ debug: true })		
			.require('./src/modules/app.js', { entry : true })
			.plugin(pathmodify, modsAliases)
			.transform('stringify')
			.transform('babelify', require('./conf/babel.config'))
			.external(libs)
			.bundle(handleError)
			.pipe(exorcist(mapFilePath))
			.pipe(fs.createWriteStream(path.join(__dirname, dir, 'app.js'), 'utf8'))
			.on('finish', function(){
				var map = grunt.file.readJSON(mapFilePath);
				for(var i=0; i<map.sources.length; i++){
					map.sources[i] = map.sources[i].replace(/\\/g,'/');
				}
				grunt.file.write(mapFilePath, JSON.stringify(map));
				done();
			});
		});
	
		grunt.registerTask('find-port', 'busca un puerto para livereload', function(){
			var done = this.async();
			findPort(function(error, port){
				if (error) {
					grunt.log.writeln('No se puede encontrar un puerto libre para livereload');
					done(false);
					return false;
				}
				grunt.config.set('connect.options.livereload', port);
				grunt.config.set('watch.bundle.options.livereload', port);
				done();
			});
		});
	
		grunt.registerTask('write-env', 'genera archivo de configuracion de ambiente', function(){
			var conf = require('./conf/app.config')(env);
			if (!conf) {
				grunt.log.error('No se encuentra configuración de ambiente "' + env + '", revise la configuración en el archivo conf/app.config.js');
				return false;
			}
			conf.RELEASE_NUM = time;
			grunt.file.write('./bundle/conf/url-config.cfg', 'module.exports='+JSON.stringify(conf)+';');
		});
	
		grunt.registerTask('env', 'levanta ambiente desarrollo', function(param){
			if (param) env = param;
	
			grunt.task.run([
				'find-port',
				'write-env',
				'sass:dev',
				'browserify-libs',
				'browserify-app',
				'connect:dev',
				'watch'
			]);
		});
	
		grunt.registerTask('posDist', 'tareas post distribución', function(){
			/**
			 * deplegar distribución en navegador
			 */
			if (publishConfig.display) {
				grunt.task.run('connect:dist');
			}
		})
	
		grunt.registerTask('dist', 'genera empaquetado para distribución', function(param){
			env = param || publishConfig.env;
			grunt.task.run([
				'write-env',
				'clean',
				'sass:dev',
				'browserify-libs',
				'browserify-app',
				'copy',
				'sass:dist',
				'uglify',
				'cleanempty',
				'string-replace:dist',
				'posDist'
			]);
		});
	
		grunt.registerTask('test', 'procesa lo necesario para realizar pruebas con karma', function(param){
			if (param) env = param;
			grunt.task.run([
				'write-env',
				'browserify-libs',
				'browserify-app'
			]);
		});
	};