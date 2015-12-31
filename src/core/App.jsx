import React, { PropTypes } from 'react';
import BaobabPropTypes from 'baobab-react/prop-types';
import { root } from '../decorators';
import pages from '../pages';
import { ExampleModal } from '../modals';
import fetchPageData from './fetchPageData';

/**
 * Root application component.
 * Sets a transition hook to load the next page's data, before rendering it,
 * and renders the client's layout, including any element that is aside from
 * the main page's content, like modals or a navigation bar.
 */
@root({
  cursors: {
    bodyClasses: ['meta', 'bodyClasses']
  }
})

export default class App extends React.Component {
  static childRoutes = pages;

  static contextTypes = {
    router: PropTypes.object,
    tree: BaobabPropTypes.baobab
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { tree, router } = this.context;

    // Creates a transition hook,
    // a function that will be run every time you transition to another page.
    this.transitionHook = createTransitionHook(tree);
    router.addTransitionHook(this.transitionHook);
  }

  componentWillUnmount() {
    const { router } = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

  render() {
    const { bodyClasses, children } = this.props;

    return (
      <div id='main' className={ bodyClasses || '' }>
        { children }
        <ExampleModal/>
      </div>
    );
  }
}

/**
 * Creates a transition hook that will load the next page's data,
 * set the metadata, track a page view, changes the page's title, etc.
 *
 * This transition hook function is meant to be used with React Router.
 *
 * @param  {Object}  state  The application's state
 * @return {Function}       The transition hook
 */
function createTransitionHook(state) {
  let _previousPathname = global.location.pathname;

  return async (nextState, router, callback) => {
    try {
      const changed = _previousPathname !== nextState.location.pathname;

      if (!changed) {
        callback();
        return;
      }

      await fetchPageData(nextState, state);
      const pageTitle = state.get('meta', 'pageTitle') || 'Wiselike';

      // Change the page title
      setPageTitle(pageTitle);

      // Update the current pathname
      _previousPathname = nextState.location.pathname;

      // ...do other transition logic
      callback();
    } catch (err) {
      console.log(err);
    }
  };
}

/**
 * Changes the page title HTML tag.
 * @param {String}  title  The new title to set.
 */
function setPageTitle(title) {
  document.querySelector('head title').innerHTML = title;
}
