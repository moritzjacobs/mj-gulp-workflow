const path = require("path");
const fs = require("fs");
const glob = require("glob");
const testPair = require("./testPair.js");

/**
 * test run for copy: files exist
 */
const copy = testPair("copy");

for (const dest in copy) {
	if (dest.indexOf("deleteme" >= 0)) {
		continue;
	}
	const file = copy[dest];

	test(`${dest} test files exist`, () => {
		expect(file.result).toBeDefined();
		expect(fs.existsSync(file.result));
	});
}

/**
 * test run for js: files exist, and content is as expected
 */
const js = testPair("js");

delete js["./input/tmp/*.js"];
for (const dest in js) {
	const file = js[dest];

	test(`js file exists: ${file.result}`, () => {
		expect(fs.existsSync(file.result)).toBe(true);
	});

	test(`js file content is as expected: ${file.result}`, () => {
		const r = fs.readFileSync(file.result, "utf8");
		const c = fs.readFileSync(file.compareTo, "utf8");

		expect(r).toBe(c);
	});
}
/**
 * test run for jsConcat: files exist, and content is as expected
 */
const jsConcat = testPair("jsConcat");

for (const dest in jsConcat) {
	const file = jsConcat[dest];

	test(`vendor file exists: ${file.result}`, () => {
		expect(fs.existsSync(file.result)).toBe(true);
	});

	test(`vendor file content is as expected: ${file.result}`, () => {
		const r = fs.readFileSync(file.result, "utf8");
		const c = fs.readFileSync(file.compareTo, "utf8");

		expect(r).toBe(c);
	});
}

/**
 * test run for css: files exist, and content is as expected
 */
const css = testPair("css");

for (const dest in css) {
	const file = css[dest];

	if (file.result === undefined) {
		break;
	}
	test(`css file exists: ${file.result}`, () => {
		expect(fs.existsSync(file.result)).toBe(true);
	});

	test(`css file content is as expected: ${file.result}`, () => {
		const r = fs.readFileSync(file.result, "utf8");
		const c = fs.readFileSync(file.compareTo, "utf8");

		expect(r).toBe(c);
	});
}

/**
 * result of the watch task test script is as expected
 */
const watchtaskCss = {
	result: path.join(process.cwd(), "test/output/css/watchtest.css"),
	compareTo: path.join(process.cwd(), "test/compare/css/watchtest.css")
};

test(`watchtask.css file content is as expected: ${watchtaskCss.result}`, () => {
	const r = fs.readFileSync(watchtaskCss.result, "utf8");
	const c = fs.readFileSync(watchtaskCss.compareTo, "utf8");

	expect(r).toBe(c);
});

/**
 * if source files are not found, don't create empty dist files
 */
const shouldNotExist = path.join(process.cwd(), "test/output/should-not-exist");

test(`${shouldNotExist}, well... should not exist!`, () => {
	expect(fs.existsSync(shouldNotExist)).toBe(false);
});

/**
 * the clean task should get rid of all *.map files
 */
test("No *.map files in output folder", () => {
	expect(
		glob.sync(path.join(process.cwd(), "test/output/**/*.map")).length
	).toBe(0);
});
