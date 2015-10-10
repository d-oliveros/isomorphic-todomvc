import React from 'react';
import { root } from '../decorators';
import Todos from '../components/Todos.jsx';
import TodoActions from '../actions/Todo';

@root({
  cursors: {
    todos: ['$viewingTodos']
  }
})

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
    let todoCount = tree.get('$viewingTodos').length;

    return {
      pageTitle: `Isomorphic Todo MVC | ${todoCount} todos`,
      bodyClasses: 'page-home'
    };
  }

  render() {
    let { todos } = this.props;

    return (
      <div>
        <h1>{ `todos (${todos.length})` }</h1>
        <Todos/>
      </div>
    );
  }
}