import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import renderClient from './core/renderClient';
import { router as IsomorphicAPI } from './api';

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const servePublicAssets = express.static(PUBLIC_DIR);

const app = express();

app.use(servePublicAssets); // Public assets
app.use(bodyParser.json()); // Parse JSON bodies
app.use(IsomorphicAPI);     // Enables remote procedure calls on the API methods
app.use(renderClient);      // Does the initial react render, serves the client

app.connectDB = connectDB;  // Exposes a method to connect to a mongoDB database

/**
 * Connects to a MongoDB database running in `host`
 *
 * @param  {String} options.host       The host to connect to
 * @param  {String} options.db         The database name to use
 * @param  {Object} options.replicaSet Replicaset configuration (optional)
 * @return {Object}                    The connection to this Mongo instance
 */
function connectDB({ host, db, replicaSet }) {
  if (replicaSet) {
    // Connect mongo to a replica set, if available
    mongoose.connect(replicaSet.uri, replicaSet.options, (err) => {
      if (err) {
        console.error(err.stack);
        process.exit(1);
      }
    });
  } else {
    // Or, connect mongo to a standalone instance
    mongoose.connect(`mongodb://${host}/${db}`);
  }

  return mongoose.connection;
}

export default app;
