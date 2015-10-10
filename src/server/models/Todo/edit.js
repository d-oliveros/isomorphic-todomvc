import Todo from './index';

export default function editTodo(todoId, edit, callback) {
  Todo.update({ _id: todoId }, { text: edit }, callback);
}
