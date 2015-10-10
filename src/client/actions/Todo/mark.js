import { Todo as TodoAPI } from '../../../server/models';

export default function markTodo(state, todoId) {
  return new Promise((resolve, reject) => {

    let todoCursor = state.select('todos', { _id: todoId });
    let todo = todoCursor.get();
    let newMarkedState = !todo.marked;

    TodoAPI.setMark(todoId, newMarkedState, (err) => {
      if (err) return reject(err);

      todoCursor.set('marked', newMarkedState);
      resolve(todoCursor.get());
    });
  });
}
