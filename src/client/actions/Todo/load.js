import { Todo as TodoAPI } from '../../../server/models';

export default function loadTodos(state) {
  return new Promise((resolve, reject) => {

    // Check if we have already loaded the todos
    if (state.get('flags', 'todosLoaded')) {
      return resolve(state.get('todos'));
    }

    // Load the todos
    TodoAPI.getAll((err, todos) => {
      if (err) return reject(err);

      state.concat('todos', todos);
      state.set(['flags', 'todosLoaded'], true);

      resolve(todos);
    });
  });
}
