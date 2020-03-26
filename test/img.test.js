const path = require("path");
const fs = require("fs");
const glob = require("glob");
const testPair = require("./testPair.js");

/**
 * test run for images: dest image files exist and are smaller than src
 */
const images = testPair("images");

for (const dest in images) {
	const image = images[dest];

	test(`${dest} test files exist`, () => {
		expect(image.result).toBeDefined();
	});

	test(`${image.result} smaller than ${image.compareTo}`, () => {
		expect(fs.statSync(image.result).size).toBeLessThanOrEqual(
			fs.statSync(image.compareTo).size
		);
	});
}

/**
 * test run for svgs: dest files exist and are smaller than src
 */
const svgs = testPair("svg");

for (const dest in svgs) {
	const svg = svgs[dest];

	test(`${dest} test files exist`, () => {
		expect(svg.result).toBeDefined();
	});

	test(`${svg.result} smaller than ${svg.compareTo}`, () => {
		expect(fs.statSync(svg.result).size).toBeLessThanOrEqual(
			fs.statSync(svg.compareTo).size
		);
	});
}

/**
 * test run for favicons: files exist
 */

if (process.env.TEST_RFG_API) {
	const favicons = testPair("favicons");

	for (let dest in favicons) {
		dest = path.join(process.cwd(), "test", dest);
		const files = glob(dest, { sync: true });

		for (const file of files) {
			const slug = path.basename(file, ".png");
			let dir = path.dirname(file);

			dir = dir.replace("/input/", "/output/");
			const testFile = path.join(dir, slug, "favicon.ico");

			test(`favicon exists: ${testFile}`, () => {
				expect(fs.existsSync(testFile)).toBe(true);
			});
		}
	}
}
