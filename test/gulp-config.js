const testConfig = require('../gulp-config-default')

testConfig.clean = {
	paths: ['./output/favicons/deleteme.txt']
}

testConfig.paths = {
	// "DESTINATION" : ['SOURCE']
	css: {
		'./output/css/': ['./input/css/**/*.scss'],
		'./output/should-not-exist/': ['./input/css/notfound.scss']
	},
	es6: {
		'./input/tmp/': ['./input/es6/index.js'],
		'./output/should-not-exist/': ['./input/es6/notfound.js']
	},
	es6Watch: {
		watch: ['./input/es6/**/*.js']
	},
	js: {
		'./output/js/script.js': ['./input/tmp/*.js', './input/js/*.js']
	},
	images: {
		'./output/images/': [
			'./input/images/**/*.jpeg',
			'./input/images/**/*.jpg',
			'./input/images/**/*.png',
			'./input/images/**/*.gif'
		]
	},
	svg: {
		'./output/images/': ['./input/images/**/*.svg']
	},
	favicons: {
		'./output/favicons/': ['./input/favicons/**/*.png']
	}
}

testConfig.combinedTasks.test = ['favicons', 'es6', 'js', 'images', 'svg', 'css', 'copy']

module.exports = testConfig
