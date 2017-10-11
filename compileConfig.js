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
				browsers: ["> 1%"]
			}
		},

		pxToRem: {
			enabled: false
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

	images: {
		imagemin: {
			enabled: true,
			config: [
				imagemin.gifsicle({ interlaced: true, optimizationLevel: 3 }),
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
			"./test/output/css/": ["./test/src/css/**/*.scss"]
		},
		js: {
			"./test/output/js/script.js": ["./test/src/js/*.js"],
			"./test/output/js/admin.js": ["./test/src/js/admin/*.js"],
		},
		images: {
			"./test/output/images/": [
				"./test/src/images/**/*.jpeg",
				"./test/src/images/**/*.jpg",
				"./test/src/images/**/*.png",
				"./test/src/images/**/*.gif"
			]
		},
		svg: {
			"./test/output/images/": ["./test/src/images/**/*.svg"]
		},
		copy: {
			"./test/output/fonts/": ["./test/src/fonts/**/*.*"],
		}
	},

	// All tasks above are available (css, js, images and svg)
	combinedTasks: {
		default: ["dist", "watch"],
		dist: ["images", "svg", "css", "js", "copy"],
		compile: ["css", "js"],
		compress: ["images", "svg"]
	},

	watchTask: {
		images: ["images"],
		svg: ["svg"],
		css: ["css"],
		js: ["js"],
		copy: ["copy"]
	}
};
