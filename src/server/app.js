import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import renderClient from './renderClient';
import { router as IsomorphicModels } from './models';

let app = express();

// Serves the CSS stylesheets
app.use('/', express.static(path.resolve(__dirname, '..', '..', 'public')));

// Handles remote calls to the models
app.use(bodyParser.json());
app.use(IsomorphicModels);

// Serve the client
app.use(renderClient);

export default app;
