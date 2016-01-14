/**
 * Starts BrowserSync.
 *
 * ---------------------------------------------------------------
 *
 * Starts the BrowserSync proxy and watches files.
 *
 */
 module.exports = function(gulp, plugins, growl) {

     gulp.task('serve', function() {
       plugins.browsersync.init({
              proxy: 'localhost:1337',
              browser: process.env.BROWSER || 'google chrome',
              notify: false,
              watchOptions: {
                  interval: 500
              },
              socket: {
                path: '/socket.io'
              }
          });
     });

 };
