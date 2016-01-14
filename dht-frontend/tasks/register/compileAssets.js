module.exports = function (gulp, plugins) {
	gulp.task('compileAssets', function(cb) {
		plugins.sequence(
			'clean:dev',
			'sass:dev',
			'copy:dev',
			'copy:system',
			'tsClient:dev',
			cb
		);
	});
};
