const uniqid = require("uniqid");

module.exports = (iconsPath, themeColor, appName) => {
	return {
		masterPicture: "./1024x1024.png",
		iconsPath,
		design: {
			ios: {
				pictureAspect: "backgroundAndMargin",
				backgroundColor: themeColor,
				margin: "14%",
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				},
				appName
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: "noChange",
				backgroundColor: themeColor,
				onConflict: "override",
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				},
				appName
			},
			androidChrome: {
				pictureAspect: "shadow",
				themeColor,
				manifest: {
					name: appName,
					display: "standalone",
					orientation: "notSet",
					onConflict: "override",
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			}
		},
		settings: {
			compression: 2,
			scalingAlgorithm: "Mitchell",
			errorOnImageTooSmall: false,
			readmeFile: true,
			htmlCodeFile: true,
			usePathAsIs: false
		},
		versioning: {
			paramName: "v",
			paramValue: uniqid()
		}
	};
};
