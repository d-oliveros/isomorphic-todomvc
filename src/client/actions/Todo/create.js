import { Todo as TodoAPI } from '../../../server/models';

export default function createTodo(state, todo) {
  return new Promise((resolve, reject) => {

    TodoAPI.add(todo, (err, todo) => {
      if (err) return reject(err);

      todo.isNew = true;
      state.unshift(['todos'], todo);

      resolve(todo);
    });
  });
}
