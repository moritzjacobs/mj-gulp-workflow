require("./globalVars.js");
require("./testConfig.js");

const assert = require("assert");
const fs = require("fs");

function cleanUp() {
	del.sync([`${__dirname}/output/**/*`]);
}

function runGulp() {
	describe("Prepare testing: \n", () => {
		it("Delete previously compiled files ...", wait => {
			cleanUp();

			setTimeout(wait, 1000);

			describe("Running gulp tasks: \n", () => new Promise(resolve => {
                require(`${__dirname}/../tasks/css/task.js`)(gulp, testConfig.css, testConfig.paths.css);
                gulp.start("css");

                resolve();
            })
                .then(() => {
                    require(`${__dirname}/../tasks/js/task.js`)(gulp, testConfig.js, testConfig.paths.js);
                    gulp.start("js");
                })
                .then(() => {
                    require(`${__dirname}/../tasks/images/task.js`)(gulp, testConfig.images, testConfig.paths.images);
                    gulp.start("images");
                })
                .then(() => {
                    require(`${__dirname}/../tasks/copy/task.js`)(gulp, testConfig.copy, testConfig.paths.copy);
                    gulp.start("copy");
                }));
		});
	});
}

function runTest() {
	describe("Testing gulp tasks: \n", () => {
        const fileJS = "./test/output/js/test.js";
        const fileCSS = "./test/output/css/main.css";
        const fileImage = "./test/output/images/test.jpg";
        const fileCopy = "./test/output/fonts/copyme.txt";
        const copyInput = fs.readFileSync("./test/input_comp/fonts/copyme.txt");
        const fileSvg = "./test/output/images/test.svg";
        const jsInput = fs.readFileSync("./test/input_comp/js/test.js", "utf8");

        const cssInput = fs.readFileSync(
            "./test/input_comp/css/main.css",
            "utf8"
        );

        const imageInput = "./test/input/images/test.jpg";
        const svgInput = "./test/input/images/test.svg";

        const compareFiles = task => {
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

        describe("SCSS to CSS compiling ... ", () => {
			it("done", scss => {
				assert.equal(true, compareFiles("css"));
				setTimeout(scss, 500);
			});
		});

        describe("Javascript compiling ... ", () => {
			it("done", js => {
				assert.equal(true, compareFiles("js"));
				setTimeout(js, 500);
			});
		});

        describe("Image (JPG) compression ... ", () => {
			it("done", img => {
				assert.equal(true, compareFiles("images"));
				setTimeout(img, 800);
			});
		});

        describe("Image (SVG) compression ... ", () => {
			it("done", img => {
				assert.equal(true, compareFiles("svg"));
				setTimeout(img, 800);
			});
		});

        describe("File copying ... ", () => {
			it("done", copy => {
				assert.equal(true, compareFiles("copy"));
				setTimeout(copy, 500);
			});
		});
    });
}

runGulp();
runTest();
