import React from 'react';
import a, { root } from '../decorators';
import TodoActions from '../actions/Todo';
console.log(a.root, a.root.default, root);
@root()

export default class HomePage extends React.Component {

  // This is the route to this page
  static route = '/';

  // This function will be called before rendering this page,
  // so make sure to load everything you need to do an initial render.
  static fetchData(nextState, tree) {
    return TodoActions.load(tree);
  }

  // This function will be called after fetching all the data
  // required to load this page, and before rendering this page.
  static meta(tree) {
    const todoCount = tree.get('$viewingTodos').length;

    return {
      pageTitle: `Isomorphic Todo MVC | ${todoCount} todos`,
      bodyClasses: 'page-home'
    };
  }

  render() {
    return (
      <div>
        <Todos/>
        <footer className='info'>
          <p>Double-click to edit a todo</p>
          <p>Created by <a href='https://github.com/d-oliveros'>David Oliveros</a></p>
          <p>Part of <a href='http://todomvc.com'>TodoMVC</a></p>
        </footer>
      </div>
    );
  }
}
