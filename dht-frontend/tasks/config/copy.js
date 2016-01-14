/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 */
module.exports = function(gulp, plugins, growl) {
	gulp.task('copy:system', function() {
		return gulp.src(['./jspm_packages/**/*'])
				.pipe(gulp.dest('.tmp/public/jspm_packages'));
				//.pipe(plugins.if(growl, plugins.notify({ message: 'Copy system task complete' })));
	});

	gulp.task('copy:dev', function() {
		return gulp.src(['./assets/**/*.!(ts|scss)', '!assets/images{,/**}', './jspm.config.js'])
				.pipe(gulp.dest('.tmp/public'))
				.pipe(plugins.if(growl, plugins.notify({ message: 'Copy dev task complete' })));
	});

	gulp.task('copy:build', function() {
		return gulp.src('.tmp/public/**/*')
				.pipe(gulp.dest('www'))
				.pipe(plugins.if(growl, plugins.notify({ message: 'Copy build task complete' })));
	});
};
