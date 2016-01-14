/**
 * Gulp/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Gulp-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */

// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'jspm_packages/github/twbs/bootstrap@*/css/bootstrap.min.css',
  'jspm_packages/npm/toastr@*/build/toastr.min.css',
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Gulp-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  //'js/dependencies/sails.io.js',

  // System.js
  'jspm_packages/system.js',
  'jspm.config.js',

  // Dependencies like jQuery, Bootstrap, or Angular are brought in here
  'js/dependencies/**/*.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/**/*.js'
];

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Gulp tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
