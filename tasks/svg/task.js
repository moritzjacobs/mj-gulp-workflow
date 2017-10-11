const svgmin = require("gulp-svgmin");

module.exports = (gulp, config, paths) => {
	gulp.task("svg", () => {
		for (let dest in paths) {
			const source = paths[dest];
			dest = replaceEnv(dest);

			let buffer = gulp.src(source);

			if (isEnabled(config.svgmin.enabled)) {
				buffer = buffer.pipe(svgmin(config.svgmin.config));
			}

			buffer.pipe(gulp.dest(dest));
		}
	});
};
