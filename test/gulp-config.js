module.exports = {

	js: {
		browserify: {
			enabled: false,
		},
	},

	favicons: {
		enabled: true,
		themeColor: "#cafe23",
		iconsPath: "./",
		appName: "FoobarBaz",
	},

	clean: {
		paths: ["./output/favicons/deleteme.txt", "./output/**/*.map"],
	},

	paths: {
		css: {
			"./output/css/": ["./input/css/**/*.scss"],
			"./output/should-not-exist/": ["./input/css/notfound.scss"],
		},
		es6: {
			"./input/tmp/": ["./input/es6/index.js"],
			"./output/should-not-exist/": ["./input/es6/notfound.js"],
		},
		es6Watch: {
			watch: ["./input/es6/**/*.js"],
		},
		js: {
			"./output/js/script.js": ["./input/tmp/*.js", "./input/js/*.js"],
		},
		jsConcat: {
			"./output/jsConcat/vendor.js": ["./input/jsConcat/**/*.js"],
		},
		images: {
			"./output/images/": [
				"./input/images/**/*.jpeg",
				"./input/images/**/*.jpg",
				"./input/images/**/*.png",
				"./input/images/**/*.gif",
			],
		},
		svg: {
			"./output/images/": ["./input/images/**/*.svg"],
		},
		favicons: {
			"./output/favicons/": ["./input/favicons/**/*.png"],
		},
	},

	combinedTasks: {
		test: ["es6", "js", "jsConcat", "images", "svg", "css", "copy", "favicons", "clean"],
		testTxt: ["es6", "js", "jsConcat", "css", "copy", "clean"],
		testImg: ["images", "svg", "favicons"],
		dist: ["es6", "js", "images", "svg", "css", "copy", "clean"],
		default: [["dist", "watch"]],
	},

	watchTask: {
		images: ["images"],
		svg: ["svg"],
		css: ["css"],
		es6Watch: ["es6"],
		js: ["js"],
		copy: ["copy"],
	},
};
