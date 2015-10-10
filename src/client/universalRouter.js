import React from 'react'; // eslint-disable-line no-unused-vars
import Router from 'react-router';
import { map } from 'lodash';
import inspect from 'util-inspect';
import fetchData from './fetchData';
import App from './App.jsx';

const debug = require('debug')('universalRouter');
const routes = createRoutes(App);

/**
 * Runs React Router with the provided location, history and state,
 * determines the component tree to be used based on the current location,
 * and fetches the data needed to render these components (pages).
 *
 * @param  {Object}  location  A `Location` instance.
 * @param  {Object}  history   A `History` instance.
 * @param  {Object}  state     A `Baobab` instance.
 *
 * @return {Component}         The application's root component.
 */
export default function universalRouter(location, history, state) {
  return new Promise((resolve, reject) => {

    debug(`Running client router. Location:\n${inspect(location)}.`);

    Router.run(routes, location, (err, routerState) => {
      if (err) return reject(err);

      debug(`Router.run called. Running 'fetchData'. routerState:\n${inspect(routerState)}`);

      fetchData(routerState, state)
        .then(() => {
          if (history) {
            routerState.history = history;
          }

          debug(`Returning. Location:\n${inspect(routerState)}.`);

          routerState.params.state = state;

          let component = <Router { ...routerState } children={ routes }/>;
          resolve(component);
        })
        .catch(reject);
    });
  });
}

/**
 * Recursively build the route definitions.
 *
 * Child routes are defined as a static property in the components themselves,
 * and can be rendered in the parent component by rendering 'props.children'.
 *
 * @param {React.Component} component
 *  A react component to be rendered if the current location.path
 *  matches this component's route path, defined as a static component property.
 *
 * @param {String} name
 *  The route's name.
 *
 * @return {Object}
 *  Object containing all the available routes, nested hierarchically.
 */
function createRoutes(component, name) {
  let { childRoutes } = component;

  let route = {
    name: name,
    path: component.route,
    component: component
  };

  if (childRoutes) {
    route.childRoutes = map(childRoutes, createRoutes);
  }

  return route;
}
