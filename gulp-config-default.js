module.exports = {
	clean: {
		paths: ['./public/**/*.map', './src/tmp']
	},

	paths: {
		// "DESTINATION" : ['SOURCE']
		css: {
			'./public/css/': ['./src/scss/**/*.scss']
		},
		js: {
			'./public/js/scripts.js': [
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
		}
	},

	combinedTasks: {
		dist: ['js', 'images', 'svg', 'css', 'copy', 'clean'],
		default: [['dist', 'watch']]
	},

	watchTask: {
		images: ['images'],
		svg: ['svg'],
		css: ['css'],
		js: ['js'],
		copy: ['copy']
	}
}
