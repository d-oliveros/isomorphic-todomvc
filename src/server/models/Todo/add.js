import Todo from './index';

export default function addTodo(todo, callback) {
  Todo.create({ text: todo }, callback);
}
