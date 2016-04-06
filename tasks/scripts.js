module.exports = function(gulp, plugins, config) {

    gulp.task('scripts', function() {

        plugins.logger.info('Scripts: ' + config.source.scripts + ' -> ' + config.dest.scripts);

        // Delete existing styles
        plugins.del([config.dest.scripts]);

        if(config.env == "local") {

            // LOCAL
            gulp.src(config.source.scripts)
                .pipe( plugins.sourcemaps.init() )              // Init of sourcemaps
                .pipe( plugins.concat('main.min.js') )
                .pipe( plugins.sourcemaps.write('.') )          // Write the sourcemaps
                .pipe( gulp.dest( config.dest.scripts ) )              // Write JS
            ;

        } else {

            // DEV, PREP or PROD
            gulp.src(config.source.scripts)
                .pipe( plugins.sourcemaps.init() )              // Init of sourcemaps
                .pipe( plugins.uglify().on('error', function(err) { plugins.logger.error(err.toString()) }) )                       // Minify js
                .pipe( plugins.concat('main.min.js') )
                .pipe( plugins.sourcemaps.write('.') )          // Write the sourcemaps
                .pipe( gulp.dest( config.dest.scripts ) )              // Write JS
            ;

        }

    });


};