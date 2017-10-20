module.exports = {
	version: "0.0.2",

	css: {
		scss: {
			config: {
				outputStyle: "compressed" // nested, compact, expanded and compressed are available options
			}
		},

		sourcemaps: {
			enabled: true
		},

		autoprefixer: {
			enabled: true,
			config: {
				browsers: ["> 0.1%"]
			}
		},

		cleanCss: {
			enabled: true,
			config: {
				compatibility: "ie8"
			}
		}
	},

	js: {
		sourcemaps: {
			enabled: true
		},

		babeljs: {
			enabled: true,
			config: {
				minified: true,
				comments: false,
				presets: [
					[
						"env",
						{
							targets: {
								browsers: ["> 0.1%"]
							}
						}
					]
				]
			}
		}
	},

	cleanup: {
		paths: ["../public/**/*.map"]
	},

	images: {
		imagemin: {
			enabled: true,
			config: [
				imagemin.gifsicle({ interlaced: true }),
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

	paths: {
		// "DESTINATION" : ['SOURCE']
		css: {
			"../public/css/": ["../src/scss/**/*.scss"]
		},
		js: {
			"../public/js/script.js": ["../src/js/script/**/*.js"]
		},
		images: {
			"../public/img/": [
				"../src/img/**/*.jpeg",
				"../src/img/**/*.jpg",
				"../src/img/**/*.png",
				"../src/img/**/*.gif"
			]
		},
		svg: {
			"../public/img/": ["../src/img/**/*.svg"]
		},
		copy: {
			"../public/fonts/": ["../src/fonts/**/*.*"],
			"../public/favicons/": ["../src/favicons/**/*.*"]
		}
	},

	// All tasks above are available (css, js, images and svg)
	combinedTasks: {
		default: ["build", "watch"],
		dist: ["build", "cleanup"],
		build: [["images", "svg", "css", "js", "copy"]],
		test: ["build"]
	},

	watchTask: {
		images: ["images"],
		svg: ["svg"],
		css: ["css"],
		js: ["js"],
		copy: ["copy"]
	}
};
