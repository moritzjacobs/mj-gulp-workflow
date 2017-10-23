const del = require("del");

module.exports = (gulp, config, paths) => {
	gulp.task("cleanup", () => {
		let dels = [];
		for (i in config.paths) {
			dels.push(config.paths[i]);
		}
		return del(dels, { force: true });
	});
};
