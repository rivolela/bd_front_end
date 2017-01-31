module.exports = function(grunt){

	//require('jit-grunt')(grunt);
	require('jit-grunt')(grunt)({
  		pluginsRoot: '/node_modules/jit-grunt/'
	});

	grunt.initConfig({
		env:{
			dev:{
				NODE_ENV: 'development'
			},
			test:{
				NODE_ENV: 'test'
			}
		},
		nodemon:{
			dev:{
				script:'server.js',
				options:{
					ext:'js,html,less,css',
					watch:['server.js','config/**/*.js','app/**/*.js','public/**/*.html','public/less/**/*.less','public/**/*.js','public/css/**/*.css','app/views/**/*.ejs']
				}
			},
			debug:{
				script:'server.js',
				options:{
					nodeArgs:['--debug'],
					ext:'js,html',
					watch:['server.js','config/**/*.js','app/**/*.js']
				}
			}
		},
		mochaTest:{
			//src:'app/tests/mocha/**/offers.server.controller.tests.js',
			src:'app/tests/mocha/**/*.js',
			options:{
				reporter:'spec'
			}
		},
		casperjs: {
    		options: {
    			engine: 'phantomjs',
    			silent: false
    		},
    		files:['app/tests/casperjs/**/*.js']
    		//files:['app/tests/casperjs/offers/**/list_offers.tests.js']
  		},
		jshint:{
			all:{
				src:['server.js',
					'config/**/*.js',
					'app/**/*.js',
					'public/js/*.js',
					'public/modules/**/*.js']
			}
		},
		csslint:{
			all:{
				src:'public/modules/**/*.css'
			}
		},
		less: {
      		dev: {
        		options: {
          			compress: true,
          			yuicompress: true,
          			optimization: 2
        		},
        		files: [{
          			// "public/css/custom_bootstrap.css": "public/css/custom_bootstrap.less" // destination file and source file,
          			expand: true,
    				cwd: 'public/less/',
    				src: ['*.less'],
    				dest: 'public/css/',
    				ext: '.css'
        		}]
      		}
   		},
		watch:{
			js:{
				files:[	'server.js',
						'config/**/*.js',
						'app/**/*.js',
						'gruntfile.js',
						'public/**/*.js',
						'app/views/**/*.ejs'],
				options:{
					livereload: true
				},
				tasks:['jshint']
			},
			css:{
				files:'public/css/**/*.css',
				tasks:['csslint']
			},
			less:{
				files:'public/less/**/*.less',
			},
			styles: {
        		files: ['public/less/**/*.less'], // which files to watch
        		tasks: ['less:dev'],
        		options: {
          			nospawn: true
        		}
      		}
		},
		concurrent:{
			dev:{
				tasks:['nodemon','watch'],
				options:{
					logConcurrentOutput:true
				}
			},
			debug:{
				tasks:['nodemon:debug','watch','node-inspector'],
				options:{
					logConcurrentOutput:true
				}
			}
		},
		'node-inspector':{
			debug:{}
		}
	});

	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-node-inspector');
	grunt.loadNpmTasks('grunt-node-inspector');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-casperjs-plugin');

	grunt.registerTask('server','Start a custom web server in development', function() {
    	//grunt.log.writeln('Started web server on port 3000');
    	require('./server.js');
	});

	grunt.registerTask('dev',['env:dev','lint','less:dev','concurrent:dev']);
	grunt.registerTask('debug',['env:dev','lint','concurrent:debug']);
	grunt.registerTask('lint',['jshint','csslint']);
	grunt.registerTask('mocha',['env:test','server','mochaTest']);
	grunt.registerTask('casper',['env:test','server','casperjs']);
	grunt.registerTask('test',['env:test','lint','less:dev','server','mochaTest','casperjs']);
};






