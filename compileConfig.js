const imagemin = require("gulp-imagemin");

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
				browsers: ["> 1%", "iOS 8", "ie 9", "ie 10", "ie 11"]
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
			"./test/output/css/": ["./test/input/css/**/*.scss"]
		},
		js: {
			"./test/output/js/script.js": ["./test/input/js/**/*.js"]
		},
		images: {
			"./test/output/images/": [
				"./test/input/images/**/*.jpeg",
				"./test/input/images/**/*.jpg",
				"./test/input/images/**/*.png",
				"./test/input/images/**/*.gif"
			]
		},
		svg: {
			"./test/output/images/": ["./test/input/images/**/*.svg"]
		},
		copy: {
			"./test/output/favicons/": ["./test/input/favicons/**/*.*"]
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
