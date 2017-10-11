require("./globalVars.js");
require("./testConfig.js");

var assert = require("assert"),
	fs = require("fs");

function cleanUp() {
	del.sync([__dirname + "/output/**/*"]);
}

function runGulp() {
	describe("Prepare testing: \n", function() {
		it("Delete previously compiled files ...", function(wait) {
			cleanUp();

			setTimeout(wait, 1000);

			describe("Running gulp tasks: \n", function() {
				return new Promise(function(resolve) {
					require(__dirname +
						"/../tasks/css/task.js")(gulp, testConfig.css, testConfig.paths.css);
					gulp.start("css");

					resolve();
				})
					.then(function() {
						require(__dirname +
							"/../tasks/js/task.js")(gulp, testConfig.js, testConfig.paths.js);
						gulp.start("js");
					})
					.then(function() {
						require(__dirname +
							"/../tasks/images/task.js")(gulp, testConfig.images, testConfig.paths.images);
						gulp.start("images");
					})
					.then(function() {
						require(__dirname +
							"/../tasks/copy/task.js")(gulp, testConfig.copy, testConfig.paths.copy);
						gulp.start("copy");
					});
			});
		});
	});
}

function runTest() {
	describe("Testing gulp tasks: \n", function() {
		var fileJS = "./test/output/js/test.js",
			fileCSS = "./test/output/css/main.css",
			fileImage = "./test/output/images/test.jpg",
			fileCopy = "./test/output/fonts/copyme.txt",
			copyInput = fs.readFileSync("./test/input_comp/fonts/copyme.txt"),
			fileSvg = "./test/output/images/test.svg",
			jsInput = fs.readFileSync("./test/input_comp/js/test.js", "utf8"),
			cssInput = fs.readFileSync(
				"./test/input_comp/css/main.css",
				"utf8"
			),
			imageInput = "./test/input/images/test.jpg",
			svgInput = "./test/input/images/test.svg",
			compareFiles = function(task) {
				if (
					task == "js" &&
					jsInput === fs.readFileSync(fileJS, "utf8")
				) {
					return true;
				}

				if (
					task == "css" &&
					cssInput === fs.readFileSync(fileCSS, "utf8")
				) {
					return true;
				}

				if (
					task == "images" &&
					fs.statSync(imageInput).size > fs.statSync(fileImage).size
				) {
					return true;
				}

				if (
					task == "svg" &&
					fs.statSync(svgInput).size > fs.statSync(fileSvg).size
				) {
					return true;
				}

				if (
					task == "copy" &&
					copyInput.toString() ===
						fs.readFileSync(fileCopy).toString()
				) {
					return true;
				}

				return false;
			};

		describe("SCSS to CSS compiling ... ", function() {
			it("done", function(scss) {
				assert.equal(true, compareFiles("css"));
				setTimeout(scss, 500);
			});
		});

		describe("Javascript compiling ... ", function() {
			it("done", function(js) {
				assert.equal(true, compareFiles("js"));
				setTimeout(js, 500);
			});
		});

		describe("Image (JPG) compression ... ", function() {
			it("done", function(img) {
				assert.equal(true, compareFiles("images"));
				setTimeout(img, 800);
			});
		});

		describe("Image (SVG) compression ... ", function() {
			it("done", function(img) {
				assert.equal(true, compareFiles("svg"));
				setTimeout(img, 800);
			});
		});

		describe("File copying ... ", function() {
			it("done", function(copy) {
				assert.equal(true, compareFiles("copy"));
				setTimeout(copy, 500);
			});
		});
	});
}

runGulp();
runTest();
