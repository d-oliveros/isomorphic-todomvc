import { Todo as TodoAPI } from '../../api';
import { findIndex } from 'lodash';

export default async function editTodo(state, todoId, edit) {
  await TodoAPI.edit(todoId, edit);

  const todoIndex = findIndex(state.get('todos'), { _id: todoId });
  state.unset(['todos', todoIndex, 'editing']);
  state.set(['todos', todoIndex, 'text'], edit);
}
