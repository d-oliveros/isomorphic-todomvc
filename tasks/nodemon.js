/* eslint-disable no-var */
var nodemon = require('gulp-nodemon');

module.exports = function startNodemon() {
  nodemon({
    script: 'index.js',
    ext: 'js,hbs',
    ignore: [
      'src/actions/*',
      'src/components/*',
      'src/decorators/*',
      'src/modals/*',
      'src/pages/*',
      'src/client.js',
      'node_modules/*'
    ],
    debug: true
  });
};
