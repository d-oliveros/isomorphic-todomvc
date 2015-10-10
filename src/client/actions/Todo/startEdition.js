import { findIndex } from 'lodash';

export default function changeEditingState(state, todoId) {
  return new Promise((resolve) => {

    let todoIndex = findIndex(state.get('todos'), { _id: todoId });
    state.set(['todos', todoIndex, 'editing'], true);

    resolve();
  });
}
