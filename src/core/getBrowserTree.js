import Baobab from 'baobab';
import inspect from 'util-inspect';
import invariant from 'invariant';
import he from 'he';
import { merge } from 'lodash';
import initialState from '../constants/initialState';

const { NODE_ENV } = process.env;
const single = {};

/**
 * Loads the client's initial state.
 * @warn Only browsers are allowed to call this function.
 * @returns {Object} The initial state. This is an instance of Baobab.
 */
export default function getBrowserTree() {
  if (single.tree) return single.tree;

  invariant(
    process.browser,
    'Only browsers are allowed to build the initial client state');

  const debug = require('debug')('state');
  let state = initialState();

  debug('Initial state', inspect(state));

  // Get the state from the `window` object. The state is passed from the server
  // to the client through a script tag added at the bottom of the <head> section.
  if (window.__INITIAL_STATE__) {
    try {
      state = JSON.parse(he.decode(window.__INITIAL_STATE__));
    } catch (err) {
      console.error('Error while trying to parse the initial state', err);
    }

    debug('Serialized state', state);
    state = merge(initialState(), state);

    const serializedStateNode = document.getElementById('serialized-state');
    serializedStateNode.parentNode.removeChild(serializedStateNode);
  }

  const options = {
    asynchronous: true,
    immutable: NODE_ENV !== 'production'
  };

  debug('Building Baobab tree with', inspect(state), options);

  single.tree = new Baobab(state, options);

  return single.tree;
}
