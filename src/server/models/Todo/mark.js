import Todo from './index';

export default function markTodo(todoId, mark, callback) {
  let query = { _id: todoId };
  let edits = { marked: mark };

  Todo.update(query, edits, callback);
}
