const log = require('fancy-log')
const path = require('path')
const fs = require('fs')
const rfgApi = require('rfg-api')
const through = require('through2')
const faviconsOptions = require('./faviconsOptions')

module.exports = (config, dest) =>
	through.obj((vinylFile, encoding, callback) => {
		const outputPath = path.join(process.cwd(), dest)
		const transformedFile = vinylFile.clone()

		const options = faviconsOptions(
			config.iconsPath,
			config.themeColor,
			config.appName
		)

		const faviconSlug = path.basename(transformedFile.path, '.png')

		log(`processing favicon from RFG-API: ${faviconSlug}`)
		log(`saving ${faviconSlug} favicons to ${outputPath}`)

		require('../../node_modules/cli-real-favicon/common')
		const rfg = rfgApi.init()
		const request = rfg.createRequest({
			// eslint-disable-next-line no-undef
			apiKey: API_KEY,
			masterPicture: transformedFile.path,
			iconsPath: options.iconsPath,
			design: options.design,
			settings: options.settings,
			versioning: options.versioning
		})

		rfg.generateFavicon(
			request,
			path.join(outputPath, faviconSlug),
			(err, result) => {
				if (err) {
					throw err
				}

				fs.writeFile(
					path.join(outputPath, faviconSlug, 'favicon.json'),
					JSON.stringify(result, null, 4),
					err => {
						if (err) {
							throw err
						} else {
							callback(null, transformedFile)
						}
					}
				)
			}
		)
	})
