import React from 'react';
import { Branch } from 'baobab-react/wrappers';
import PropTypes from 'baobab-react/prop-types';

/**
 * Decorator for a root component.
 */
export default function rootDecorator(params) {
  return (BaseComponent) => {
    let ComposedComponent = plantTree(BaseComponent, params);

    const componentDisplayName =
      BaseComponent.name ||
      BaseComponent.displayName ||
      'Component';

    ComposedComponent.childRoutes = BaseComponent.childRoutes;
    ComposedComponent.fetchData = BaseComponent.fetchData;
    ComposedComponent.route = BaseComponent.route;
    ComposedComponent.meta = BaseComponent.meta;
    ComposedComponent.displayName = `Rooted ${componentDisplayName}`;

    return ComposedComponent;
  };
}

/**
 * Wraps `Component` in a Higher-Order component
 * providing the Baobab `tree` (the state) in the context.
 *
 * @param  {Class:React.Component}  Component  The component to wrap.
 * @return {Class:React.Component}             The wrapped component.
 */
function plantTree(Component, { cursors, actions }) {

  return class TreeRoot extends React.Component {
    static childContextTypes = {
      tree: PropTypes.baobab
    };

    getChildContext() {
      return {
        tree: this.tree
      };
    }

    constructor(props, context) {
      super(props, context);

      // Gets the tree from `props` in the server,
      // and from `../state.js` in the browser
      this.tree = props.params && props.params.state
        ? props.params.state
        : require('../state');
    }

    render() {
      return (
        <Branch cursors={ cursors } actions={ actions }>
          <Component { ...this.props } />
        </Branch>
      );
    }
  };
}
