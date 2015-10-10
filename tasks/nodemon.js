var nodemon = require('gulp-nodemon');

module.exports = function startNodemon() {
  nodemon({
    script: 'init.js',
    ext: 'js,hbs',
    ignore: ['client/*', 'node_modules/*'],
    debug: true
  });
};
