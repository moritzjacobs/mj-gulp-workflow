const merge = require("merge-stream");
const fg = require("../../lib/favicons");
const argv = require("../../lib/argv");
const isEnabled = require("../../lib/isEnabled.js")(argv.env);
const replaceEnv = require("../../lib/replaceEnv.js")(argv.env);

module.exports = (gulp, config, paths) => {
	gulp.task("favicons", () => {
		let stream;

		for (const dest in paths) {
			const source = paths[dest];

			let buffer = gulp.src(source, {allowEmpty: true});

			if (isEnabled(config.enabled)) {
				buffer = buffer.pipe(fg(config, replaceEnv(dest)));
			}

			if (stream === undefined) {
				stream = buffer;
			} else {
				stream = merge(stream, buffer);
			}
		}

		return stream;
	});
};
