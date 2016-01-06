import { findIndex } from 'lodash';

export default async function changeEditingState(state, todoId) {
  const todoIndex = findIndex(state.get('todos'), { _id: todoId });
  state.set(['todos', todoIndex, 'editing'], true);
}
