import React from 'react';
import invariant from 'invariant';
import Location from 'react-router/lib/Location';
import { history } from 'react-router/lib/BrowserHistory';
import universalRouter from './universalRouter';
import state from './state';

/**
 * This is the entry file for the client application.
 * This file, when required, initializes the client in the browser.
 */
invariant(
  process.browser,
  'Only browsers are allowed to bootstrap the client');

// ... do other client bootstrap logic

// Runs the universal router with the current location,
// and does the initial render.
let { pathname, search } = document.location;
let location = new Location(pathname, search);

universalRouter(location, history, state)
  .then((component) => {
    let container = document.getElementById('react-container');
    React.render(component, container);
  });
