const fs = require("fs");

const compileConfigExists = () =>
	fs.existsSync(`${global.appRootDir}/compileConfig.js`);

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

	if (!compileConfigExists()) {
		writeDefaultConfig();
	}

	if (configVersionsDifferent()) {
		console.info(
			`The defaultConfig was updated! Make sure to update you compileConfig accordingly. New version: ${defaultConfig.version}`
		);
	}

	return require(`${global.appRootDir}/compileConfig.js`);
	// return require(global.moduleRootDir + '/defaultConfig.js');
};

module.exports = config;
