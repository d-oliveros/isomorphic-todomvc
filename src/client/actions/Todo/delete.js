import { Todo as TodoAPI } from '../../../server/models';
import { findIndex } from 'lodash';

export default function deleteTodo(state, todoId) {
  return new Promise((resolve, reject) => {

    TodoAPI.delete(todoId, (err) => {
      if (err) return reject(err);

      let todoIndex = findIndex(state.get('todos'), { _id: todoId });
      state.unset(['todos', todoIndex]);

      resolve();
    });
  });
}
