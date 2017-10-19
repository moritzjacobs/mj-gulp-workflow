const merge = require("merge-stream");

module.exports = (gulp, config, paths) => {
	gulp.task("copy", () => {
		let stream;
		for (let dest in paths) {
			const source = paths[dest];
			dest = replaceEnv(dest);

			const buffer = gulp.src(source).pipe(gulp.dest(dest));

			if (stream === undefined) {
				stream = buffer;
			} else {
				stream = merge(stream, buffer);
			}
		}

		return stream;
	});
};
