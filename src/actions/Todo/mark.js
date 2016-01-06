import { Todo as TodoAPI } from '../../api';

export default async function markTodo(state, todoId) {
  const todoCursor = state.select('todos', { _id: todoId });
  const todo = todoCursor.get();
  const newMarkedState = !todo.marked;

  await TodoAPI.mark(todoId, newMarkedState);

  todoCursor.set('marked', newMarkedState);
  return todoCursor.get();
}
