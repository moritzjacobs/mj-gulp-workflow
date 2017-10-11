module.exports = function(gulp, config, paths) {
	gulp.task("copy", function() {
		for (var dest in paths) {
			var source = paths[dest];
			dest = replaceEnv(dest);

			var buffer = gulp.src(source);
			buffer.pipe(gulp.dest(dest));
		}
	});
};
