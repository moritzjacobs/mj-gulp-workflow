module.exports = (gulp, config, paths) => {
	gulp.task("copy", () => {
		for (let dest in paths) {
			const source = paths[dest];
			dest = replaceEnv(dest);

			const buffer = gulp.src(source);
			buffer.pipe(gulp.dest(dest));
		}
	});
};
