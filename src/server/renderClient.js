import fs from 'fs';
import path from 'path';
import jsesc from 'jsesc';
import inspect from 'util-inspect';
import React from 'react';
import Baobab from 'baobab';
import handlebars from 'handlebars';
import { pick } from 'lodash';
import Location from 'react-router/lib/Location';
import initialState from '../client/constants/initialState';
import universalRouter from '../client/universalRouter';

const debug = require('debug')('renderer');
const buildHtml = handlebars.compile(getTemplateFile());
const initialStateKeys = Object.keys(initialState());

/**
 * Initializes the client, serializes the state, and sends the app's HTML
 */
export default function requestClient(req, res, next) {
  let { path, query } = req;
  let location = new Location(path, query);

  // Build the initial state
  let tree = new Baobab(initialState(), {
    asynchronous: false,
    autocommit: false,
    immutable: false
  });

  debug(`Rendering client. Location: ${inspect(location)}`);

  // Load all the data required to do the initial render
  universalRouter(location, undefined, tree)
  .then((component) => {
    let body = React.renderToString(component);

    let html = buildHtml({
      body: body,
      serializedState: serializeState(tree)
    });

    // Wipe out the state instance
    tree.release();

    debug(`Rendered client. HTML length: ${html.length}`);
    res.send(html);
  })
  .catch((err) => {
    tree.release();
    next(err);
  });
}

// Reads the layout file
function getTemplateFile() {
  const source = path.join(__dirname, 'layout.hbs');
  return fs.readFileSync(source, { encoding: 'utf-8' });
}

// Serializes the state
function serializeState(state) {
  let keys = initialStateKeys.filter((name) => {
    return name[0] !== '$';
  });

  state = pick(state.get(), ...keys);

  return jsesc(JSON.stringify(state));
}
