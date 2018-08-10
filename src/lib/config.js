const fs = require('fs')
const path = require('path')

const compileConfigExistsInAppRootDir = global =>
	fs.existsSync(`${global.appRootDir}/gulp-config.js`)

const compileConfigExistsInCwd = global => {
	const cwd = process.cwd()
	return fs.existsSync(`${cwd}/gulp-config.js`)
}

module.exports = global => {
	if (
		!compileConfigExistsInAppRootDir(global) &&
		!compileConfigExistsInCwd(global)
	) {
		const defaultConfig = fs.readFileSync(
			path.join(global.moduleRootDir, '..', 'gulp-config-default.js'),
			'UTF-8'
		)

		// Write the default compileConfig file
		fs.writeFileSync(`${global.appRootDir}/gulp-config.js`, defaultConfig)
		console.log(`Load config from: ${global.appRootDir}/gulp-config.js`)
		return require(`${global.appRootDir}/gulp-config.js`)
	} else if (compileConfigExistsInAppRootDir(global)) {
		console.info(
			`Loading config from: ${global.appRootDir}/gulp-config.js`
		)
		return require(`${global.appRootDir}/gulp-config.js`)
	} else if (compileConfigExistsInCwd(global)) {
		const cwd = process.cwd()
		global.runFrom = cwd
		console.info(`Loading config from: ${cwd}/gulp-config.js`)
		return require(`${cwd}/gulp-config.js`)
	}
}
