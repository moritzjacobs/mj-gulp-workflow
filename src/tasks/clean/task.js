const del = require("del");

module.exports = (gulp, config, paths) => {
	gulp.task("clean", () => {
		const dels = [];

		for (const i in config.paths) {
			dels.push(config.paths[i]);
		}

		return del(dels, {force: true});
	});
};
