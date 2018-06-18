const glob = require('glob')
const path = require('path')
const config = require('../test/gulp-config.js')

module.exports = (task, runFrom = `${process.cwd()}/test`) => {
	const paths = config.paths[task]
	let ret = []

	for (const dest in paths) {
		const srcs = paths[dest]
		for (const src of srcs) {
			let compareToGlob = src.replace('/input/', '/compare/')
			compareToGlob = compareToGlob.replace('.scss', '.css')
			compareToGlob = path.join(runFrom, compareToGlob)
			const files = glob(compareToGlob, { sync: true })

			ret[src] = {}

			for (const compareTo of files) {
				let result = compareTo.replace('/compare/', '/output/')
				ret[src]['result'] = result
				ret[src]['compareTo'] = compareTo
				break
			}
		}
	}

	return ret
}
