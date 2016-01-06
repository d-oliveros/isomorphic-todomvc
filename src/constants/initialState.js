import { monkey } from 'baobab';

export default function initialStateFactory() {
  return {

    // Stores
    todos: [],

    // Flags
    flags: {
      todosLoaded: false
    },

    // Facets
    $viewingTodos: monkey({
      cursors: {
        todos: ['todos']
      },
      get({ todos }) {
        return todos;
      }
    })
  };
}
