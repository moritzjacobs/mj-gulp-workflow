module.exports = (gulp, config, paths) => {
	const concatConfig = {
		sourcemaps: {
			enabled: false,
		},
		browserify: {
			enabled: false,
		},

		babeljs: {
			enabled: false,
			config: {
				minified: true,
				comments: false,
			},
		},
	};

	require("../js/es")("jsConcat", gulp, concatConfig, paths);
};
