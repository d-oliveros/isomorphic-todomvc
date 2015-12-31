/* eslint-disable no-var */
/* eslint-disable vars-on-top */
var config = {};

if (!process.env.MONGO_REPLICA_SET) {

  // Stand-alone config
  config.mongo = {
    db: process.env.MONGO_DB || 'isomorphic_todomvc',
    host: process.env.MONGO_HOST || '127.0.0.1',
    pass: process.env.MONGO_PASS || null
  };

} else {
  // Replica set config
  config.mongo = {
    db: process.env.MONGO_DB,
    port: process.env.MONGO_PORT || '6379',
    replicaSet: {
      hosts: process.env.MONGO_REPLICA_HOSTS.split(',').map((host) => host.trim()),
      options: {
        replset: { replicaSet: process.env.MONGO_REPLICA_SET, connectTimeoutMS: 5000, keepAlive: 1 },
        server: { keepAlive: 1, connectTimeoutMS: 5000 },
        readPreference: 'PRIMARY',
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS
      }
    }
  };

  var replicaSet = config.mongo.replicaSet;
  var hosts = replicaSet.hosts;
  var port = config.mongo.port;
  var db = config.mongo.db;

  // URI is in the following format:
  // mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
  replicaSet.uri = hosts.map(function (host, key) {
    var prefix = key === 0 ? 'mongodb://' : '';
    var suffix = key === (hosts.length - 1) ? '/' + db : '';
    return prefix + host + ':' + port + suffix;
  }).join(',');
}

module.exports = config;
