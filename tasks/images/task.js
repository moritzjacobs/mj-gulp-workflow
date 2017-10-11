const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");

module.exports = (gulp, config, paths) => {
	gulp.task("images", () => {
		for (let dest in paths) {
			const source = paths[dest];
			dest = replaceEnv(dest);

			let buffer = gulp.src(source);

			if (isEnabled(config.imagemin.enabled)) {
				buffer = buffer.pipe(imagemin(config.imagemin.config));
				buffer = buffer.pipe(imagemin(pngquant()));
			}

			buffer.pipe(gulp.dest(dest));
		}
	});
};
