
/**
 * Registers babel, loads the environment,
 * and bootstraps the server.
 */
require('babel/register');
require('./loadenv');

var app = require('./src/server/app');
var config = require('./config');

var serverPort = config.server.port;
var dbConfig = config.database.mongo;

// Connect to the mongo database
app.connectDB(dbConfig);

// Starts listening at port `port`
app.listen(serverPort, function() {
  console.log('App listening on port: ' + serverPort);

  process.on('uncaughtException', function(err) {
    console.error(err.stack);
  });
});
