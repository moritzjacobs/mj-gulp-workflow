const fs = require("fs");

const compileConfigExistsInAppRootDir = () =>
	fs.existsSync(`${global.appRootDir}/compileConfig.js`);

const compileConfigExistsInCwd = () => {
	const cwd = process.cwd();
	return fs.existsSync(`${cwd}/compileConfig.js`);
};

const writeDefaultConfig = () => {
	const defaultConfig = fs.readFileSync(
		`${global.moduleRootDir}/defaultConfig.js`,
		"UTF-8"
	);

	// Write the default compileConfig file
	fs.writeFileSync(`${global.appRootDir}/compileConfig.js`, defaultConfig);
};

const configVersionsDifferent = () => {
	const defaultConfig = require(`${global.moduleRootDir}/defaultConfig.js`);
	const compileConfig = require(`${global.appRootDir}/compileConfig.js`);

	return compileConfig.version !== defaultConfig.version;
};

const config = () => {
	const defaultConfig = require(`${global.moduleRootDir}/defaultConfig.js`);

	// nowhere
	if (!compileConfigExistsInAppRootDir() && !compileConfigExistsInCwd()) {
		writeDefaultConfig();
		if (configVersionsDifferent()) {
			console.info(
				`The defaultConfig was updated! Make sure to update you compileConfig accordingly. New version: ${defaultConfig.version}`
			);
		}
		console.log(`Load config from: ${global.appRootDir}/compileConfig.js`);
	} else if (compileConfigExistsInAppRootDir()) {
		console.info(
			`Loading config from: ${global.appRootDir}/compileConfig.js`
		);
		return require(`${global.appRootDir}/compileConfig.js`);
	} else if (compileConfigExistsInCwd()) {
		const cwd = process.cwd();
		global.runFrom = cwd;
		console.info(`Loading config from: ${cwd}/compileConfig.js`);
		return require(`${cwd}/compileConfig.js`);
	}
};

module.exports = config;
