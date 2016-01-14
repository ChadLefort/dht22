/**
 * Compile TypeScript files to JavaScript.
 *
 * ---------------------------------------------------------------
 *
 * Compiles TypeScript files from `assest/js` into Javascript.
 *
 */
module.exports = function(gulp, plugins, growl) {
  var tsProject = plugins.typescript.createProject('tsconfig.json', { sortOutput: true });

	gulp.task('tsClient:dev', function() {
		var tsResult = gulp.src(['assets/app/**/*.ts', 'typings/**/*.d.ts'])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.typescript(tsProject));

    return tsResult.js
    .pipe(gulp.dest('.tmp/public/app/'))
    .pipe(plugins.sourcemaps.write())
		.pipe(plugins.if(growl, plugins.notify({ message: 'Typscript compile task complete' })));
	});
};
