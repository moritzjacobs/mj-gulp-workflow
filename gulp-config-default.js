const imagemin = require('gulp-imagemin')
const browserlist = ['> 0.1%']

module.exports = {
	css: {
		scss: {
			config: {
				outputStyle: 'compressed' // nested, compact, expanded and compressed are available options
			}
		},

		sourcemaps: {
			enabled: 'dev'
		},

		autoprefixer: {
			enabled: true,
			config: {
				browserlist: browserlist
			}
		},

		cleanCss: {
			enabled: true,
			config: {
				compatibility: 'ie8'
			}
		}
	},

	js: {
		sourcemaps: {
			enabled: 'dev'
		},
		browserify: {
			enabled: false
		},

		babeljs: {
			enabled: true,
			config: {
				minified: true,
				comments: false
			}
		}
	},

	es6: {
		sourcemaps: {
			enabled: 'dev'
		},
		browserify: {
			enabled: true
		},

		babeljs: {
			enabled: true,
			config: {
				minified: true,
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								browsers: browserlist
							}
						}
					]
				]
			}
		}
	},

	clean: {
		enabled: 'dist',
		paths: ['./public/**/*.map', './src/tmp']
	},

	images: {
		imagemin: {
			enabled: true,
			config: [
				imagemin.gifsicle(),
				imagemin.jpegtran({ progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({ plugins: [{ removeViewBox: true }] })
			]
		}
	},

	svg: {
		svgmin: {
			enabled: true,
			config: {}
		}
	},

	favicons: {
		enabled: true,
		themeColor: '#cafe23',
		iconsPath: './',
		appName: 'FoobarBaz'
	},

	paths: {
		// "DESTINATION" : ['SOURCE']
		css: {
			'./public/css/': ['./src/scss/**/*.scss']
		},
		es6: {
			'./src/tmp/es6-bundle.js': ['./src/es6/index.js']
		},
		es6Watch: {
			0: ['./src/es6/**/*.js']
		},
		js: {
			'./public/js/script.js': [
				'./src/tmp/es6-bundle.js',
				'./src/js/*.js'
			]
		},
		jsConcat: {
			'./public/js/vendor.js': ['./src/js/vendor/*.js']
		},
		images: {
			'./public/img/': [
				'./src/img/**/*.jpeg',
				'./src/img/**/*.jpg',
				'./src/img/**/*.png',
				'./src/img/**/*.gif'
			]
		},
		svg: {
			'./public/img/': ['..src/img/**/*.svg']
		},
		copy: {
			'./public/fonts/': ['./src/fonts/**/*.*']
		},
		favicons: {
			'./public/favicons/': ['./src/favicons/**/*.png']
		}
	},

	// All tasks above are available (css, js, images and svg)
	combinedTasks: {
		dist: ['es6', 'js', 'images', 'svg', 'css', 'copy', 'clean'],
		default: [['dist', 'watch']]
	},

	watchTask: {
		images: ['images'],
		svg: ['svg'],
		css: ['css'],
		es6Watch: ['es6'],
		js: ['js'],
		copy: ['copy']
	}
}
