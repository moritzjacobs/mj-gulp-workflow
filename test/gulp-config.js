let testConfig = require("../gulp-config-default");

testConfig.cleanup = {
	paths: ["./output/**/*.map", "./output/deleteme"]
};

testConfig.paths = {
	// "DESTINATION" : ['SOURCE']
	css: {
		"./output/css/": ["./input/css/**/*.scss"]
	},
	js: {
		"./output/js/script.js": ["./input/js/*.js"]
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
};

module.exports = testConfig;
