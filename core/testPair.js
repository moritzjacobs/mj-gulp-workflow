const glob = require("glob");
const path = require("path");
const fs = require("fs");

const config = require("../compileConfig.js");

module.exports = function(task) {
	const paths = config.paths[task];
	let ret = [];

	for (dest in paths) {
		const srcs = paths[dest];
		for (src of srcs) {
			let compareToGlob = src.replace("/input/", "/compare/");
			compareToGlob = compareToGlob.replace(".scss", ".css");
			const files = glob(compareToGlob, { sync: true });

			ret[src] = {};

			for (compareTo of files) {
				let result = compareTo.replace("/compare/", "/output/");
				ret[src]["result"] = result;
				ret[src]["compareTo"] = compareTo;
				break;
			}
		}
	}

	return ret;
};
