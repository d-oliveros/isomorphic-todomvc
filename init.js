
/**
 * Registers babel, loads the environment, defines the globals,
 * and bootstraps the server.
 */
require('babel/register');

require('./loadenv');
require('./globals');

var Server = require('./src/server/server');
var app = require('./src/server/app');
var port = __config.server.port;

var server = new Server(app);

server.bootstrap(port, function() {
  console.log('App listening on port: ' + port);

  process.on('uncaughtException', function(exception) {
    __log.error(exception);
  });
});
