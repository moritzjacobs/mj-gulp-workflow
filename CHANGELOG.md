# changelog

## 1.2.1
- Fix run-sequence and cleanup task
- Filter junk files in task inclusion by glob and remove output dir before running gulp test

## 1.2.0
- added cleanup task for file removal (sourcemaps)
- added gulp-notify for errors
- replaced native gulp.watch with gulp-watch for better error handling
- added clean task to remove sourcemaps

## 1.1.1
- cleanup, refactoring and overall code quality

## 1.1.0

- Moved testing to jest
- Run tests with `npm test` (run `gulp dist` first!)
