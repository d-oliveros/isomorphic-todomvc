import React, { PropTypes } from 'react';
import BaobabPropTypes from 'baobab-react/prop-types';
import { ExampleModal } from './modals';
import { root } from './decorators';
import fetchData from './fetchData';
import pages from './pages';

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
    let { tree, router } = this.context;

    // Creates a transition hook,
    // a function that will be run every time you transition to another page.
    this.transitionHook = createTransitionHook(tree);
    router.addTransitionHook(this.transitionHook);
  }

  componentWillUnmount() {
    let { router } = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

  render() {
    let { bodyClasses, children } = this.props;

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

  return (nextState, router, callback) => {
    let changed = _previousPathname !== nextState.location.pathname;

    if (!changed) {
      return callback();
    }

    fetchData(nextState, state)
      .then(() => {
        let pageTitle = state.get('meta', 'pageTitle') || 'Wiselike';

        // Change the page title
        setPageTitle(pageTitle);

        // Update the current pathname
        _previousPathname = nextState.location.pathname;

        // ...do other transition logic

        callback();
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

/**
 * Changes the page title HTML tag.
 * @param {String}  title  The new title to set.
 */
function setPageTitle(title) {
  document.querySelector('head title').innerHTML = title;
}
