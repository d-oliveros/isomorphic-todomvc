import fs from 'fs';
import path from 'path';
import jsesc from 'jsesc';
import inspect from 'util-inspect';
import React from 'react';
import Baobab from 'baobab';
import handlebars from 'handlebars';
import { pick } from 'lodash';
import Location from 'react-router/lib/Location';
import initialState from '../constants/initialState';
import universalRouter from './universalRouter';

const debug = require('debug')('app:renderClient');
const buildHtml = handlebars.compile(getTemplateFile());
const initialStateKeys = Object.keys(initialState());

/**
 * Initializes the client, serializes the state, and sends the app's HTML
 */
export default async function requestClient(req, res, next) {
  const { path, query } = req;
  const location = new Location(path, query);

  // Build the initial state
  const tree = new Baobab(initialState(), {
    asynchronous: false,
    autocommit: false,
    immutable: false
  });

  debug(`Rendering client. Location: ${inspect(location)}`);

  try {
    // Load all the data required to do the initial render
    const component = await universalRouter(location, undefined, tree);
    const body = React.renderToString(component);

    const html = buildHtml({
      body: body,
      serializedState: serializeState(tree)
    });

    // Wipe out the state instance
    tree.release();

    debug(`Rendered client. HTML length: ${html.length}`);
    res.send(html);

  } catch (err) {
    tree.release();
    next(err);
  }
}

/**
 * Reads the layout file.
 * @return {String}  The client's layout handlebars source
 */
function getTemplateFile() {
  const source = path.join(__dirname, '..', 'layout.hbs');
  return fs.readFileSync(source, { encoding: 'utf-8' });
}

/**
 * Serializes the state.
 *
 * @param  {Object}  state  Baobab Tree to sanitize.
 * @return {String}         Serialized and stringified state.
 */
function serializeState(state) {
  const keys = initialStateKeys.filter((name) => name[0] !== '$');

  state = pick(state.get(), ...keys);

  return jsesc(JSON.stringify(state));
}
