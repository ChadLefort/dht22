module.exports = function (gulp, plugins) {
	gulp.task('default', function(cb) {
		plugins.sequence(
			'compileAssets',
			['images', 'linkAssets'],
			'serve',
			['watch:assets', 'watch:scss', 'watch:ts', 'watch:html'],
			cb
		);
	});
};
