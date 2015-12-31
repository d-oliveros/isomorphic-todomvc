import React from 'react';
import invariant from 'invariant';
import Location from 'react-router/lib/Location';
import { history } from 'react-router/lib/BrowserHistory';
import universalRouter from './core/universalRouter';
import getBrowserTree from './core/getBrowserTree';

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
const { pathname, search } = document.location;
const location = new Location(pathname, search);

universalRouter(location, history, getBrowserTree())
  .then((component) => {
    const container = document.getElementById('react-container');
    React.render(component, container);
  })
  .catch((err) => {
    console.log(err);
  });
