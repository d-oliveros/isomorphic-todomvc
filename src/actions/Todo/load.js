import { Todo as TodoAPI } from '../../api';

export default async function loadTodos(state) {

  // Check if we have already loaded the todos
  if (state.get('flags', 'todosLoaded')) {
    return state.get('todos');
  }

  // Load the todos
  const todos = await TodoAPI.getAll();

  state.concat('todos', todos);
  state.set(['flags', 'todosLoaded'], true);

  return todos;
}
