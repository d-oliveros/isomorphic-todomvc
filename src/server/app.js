import express from 'express';
import bodyParser from 'body-parser';
import renderClient from './renderClient';
import { router as IsomorphicModels } from './models';

let app = express();

// Handles remote calls to the models
app.use(bodyParser.json());
app.use(IsomorphicModels);

// Serve the client
app.use(renderClient);

export default app;
