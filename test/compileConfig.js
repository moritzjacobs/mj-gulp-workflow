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
		paths: ["./output/**/*.map", "./output/deleteme"]
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
			"./output/css/": ["./input/css/**/*.scss"]
		},
		js: {
			"./output/js/script.js": ["./input/js/**/*.js"]
		},
		images: {
			"./output/images/": [
				"./input/images/**/*.jpeg",
				"./input/images/**/*.jpg",
				"./input/images/**/*.png",
				"./input/images/**/*.gif"
			]
		},
		svg: {
			"./output/images/": ["./input/images/**/*.svg"]
		},
		copy: {
			"./output/favicons/": ["./input/favicons/**/*.*"],
			"./output/deleteme": ["./input/deleteme/**/*.*"]
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
