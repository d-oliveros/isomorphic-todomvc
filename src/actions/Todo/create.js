import { Todo as TodoAPI } from '../../api';

export default async function createTodo(state, newTodo) {
  const todo = await TodoAPI.add(newTodo);

  todo.isNew = true;
  state.unshift(['todos'], todo);

  return todo;
}
