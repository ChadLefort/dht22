/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 */
module.exports = function(gulp, plugins, growl) {

     gulp.task('watch:assets', function() {
         return gulp.watch(['tasks/pipeline.js'], ['syncAssets']);
     });

     gulp.task('watch:scss', function() {
         return gulp.watch(['assets/**/*.scss'], ['sass:dev']);
     });

     gulp.task('watch:ts', ['tsClient:dev'], plugins.browsersync.reload);
     gulp.watch(['assets/**/*.ts'], ['watch:ts']);

     gulp.task('watch:html', ['syncAssets'], plugins.browsersync.reload);
     gulp.watch(['assets/**/*.html'], ['watch:html']);

 };
