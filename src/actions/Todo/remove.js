import { Todo as TodoAPI } from '../../api';
import { findIndex } from 'lodash';

export default async function deleteTodo(state, todoId) {
  await TodoAPI.delete(todoId);

  const todoIndex = findIndex(state.get('todos'), { _id: todoId });
  state.unset(['todos', todoIndex]);
}
