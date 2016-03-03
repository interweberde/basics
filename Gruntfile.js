module.exports = grunt => {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'assets/css/style.css': 'assets/scss/style.scss'
				}
			}
		},
		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['assets/css/**/*.css']
			}
		},
		postcss: {
			options: {
				map: true,

				processors: [
					require('autoprefixer')({browsers: ["last 2 versions", "IE 8", "IE 9", "IE 10"]}),
				]
			},
			dist: {
				src: 'assets/css/*.css'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				devel: true,
				globals: {
					jQuery: true

				},
			},
			dev: {
				files: {
					src: ['assets/js/**/*.js']
				},
			}
		},
		watch: {
			scripts: {
				files: 'assets/js/**/*.js',
				tasks: ['jshint'],
				options: {
					interrupt: true,
				},
			},
			css: {
				files: 'assets/sass/**/*.scss',
				tasks: ['sass', 'postcss'],
				options: {
					interrupt: true,
				},
			},
			options: {
				livereload: true,
			},
		},
	});
	grunt.registerTask("default", ["sass", "csslint", "postcss", "jshint", "watch"]);
	grunt.registerTask("setup", ["sass", "postcss"]);
};
