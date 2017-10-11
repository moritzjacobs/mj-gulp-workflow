const postcss = require("gulp-postcss");
const pxtorem = require("postcss-pxtorem");

module.exports = (buffer, config) =>
	buffer.pipe(
		postcss([pxtorem(config)]).on("error", error => {
			console.error(error.toString());
		})
	);
