import mongoose from 'mongoose';
import { mongo } from '../../../config/database';

let { host, db, replicaSet } = mongo;

// Connect mongo to a replica set, if available
if (replicaSet) {
  mongoose.connect(replicaSet.uri, replicaSet.options, (err) => {
    if (err) {
      __log.error(err.stack);
      process.exit(1);
    }
  });
}

// Or, connect mongo to a standalone instance
else {
  mongoose.connect(`mongodb://${host}/${db}`);
}

export default mongoose.connection;
