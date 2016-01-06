import inspect from 'util-inspect';
import invariant from 'invariant';

const debug = require('debug')('app:fetchData');

/**
 * Runs the data fetching functions defined in the router state's component tree.
 *
 * @param  {Object}  routerState  The router's state to take the components from.
 * @param  {state}   state        The application's state.
 * @return {Promise}              A promise that will be resolved when all the
 *                                data has been fetched.
 */
export default function fetchPageData(routerState, tree) {
  debug(`Fetching component data. Branch is:\n${inspect(routerState.branch)}`);

  const components = routerState.branch.map(route => route.component);
  const promises = fetchComponentsData(components, routerState, tree);

  return Promise.all(promises).then(() => setComponentsMeta(components, tree));
}

// Run each component's fetchData static method
function fetchComponentsData(components, routerState, tree) {

  debug(`Components are:\n${inspect(components)}`);

  const componentsFetchData = components
    .filter(component => component.fetchData)
    .map(component => component.fetchData(routerState, tree));

  debug(`componentsFetchData is:\n${inspect(componentsFetchData)}`);

  return componentsFetchData;
}

// Sets the component's metadata in the state
function setComponentsMeta(components, tree) {
  components
    .filter(component => component.meta)
    .map(component => component.meta)
    .forEach((meta) => {

      invariant(typeof meta === 'function', 'Meta must be a function');
      const data = meta(tree);

      if (typeof data === 'object') {
        tree.set('meta', data);
      }
    });
}
