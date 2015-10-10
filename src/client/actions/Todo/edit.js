import { Todo as TodoAPI } from '../../../server/models';
import { findIndex } from 'lodash';

export default function editTodo(state, todoId, edit) {
  return new Promise((resolve, reject) => {

    TodoAPI.edit(todoId, edit, (err) => {
      if (err) return reject(err);

      let todoIndex = findIndex(state.get('todos'), { _id: todoId });
      state.unset(['todos', todoIndex, 'editing']);
      state.set(['todos', todoIndex, 'text'], edit);

      resolve();
    });
  });
}
