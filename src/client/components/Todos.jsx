import React from 'react';
import { branch } from 'baobab-react/decorators';
import classes from 'classnames';
import pluralize from 'pluralize';
import { pluck } from 'lodash';
import { Todo as TodoActions } from '../actions';

@branch({
  cursors: {
    todos: ['$viewingTodos']
  },
  actions: {
    createTodo: TodoActions.create,
    editTodo: TodoActions.edit,
    startEdition: TodoActions.startEdition,
    deleteTodo: TodoActions.delete,
    markTodo: TodoActions.mark
  }
})

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newTodo: '' };
  }

  editNewTodo(e) {
    let newTodo = e.target.value;
    this.setState({ newTodo });
  }

  clearTodos() {
    let { todos, actions: { deleteTodo }} = this.props;
    let completedTodos = todos.filter((todo) => todo.marked);
    pluck(completedTodos, '_id').forEach(deleteTodo);
  }

  editTodo(_id, e) {
    let code = e.keyCode || e.which;

    if (code === 13) {
      this.props.actions.editTodo(_id, e.target.value);
    }
  }

  onKeyDown(e) {
    let code = e.keyCode || e.which;
    let { newTodo } = this.state;

    if (code === 13) {
      this.props.actions.createTodo(newTodo).then(() => {
        this.setState({ newTodo: '' });
      });
    }
  }

  render() {
    let { todos, actions: { markTodo, deleteTodo, startEdition } } = this.props;
    let { newTodo } = this.state;
    let pendingTodos = todos.filter((todo) => !todo.marked);

    let inputBoxAttrs = {
      autoFocus: true,
      className: 'new-todo',
      value: newTodo,
      onChange: ::this.editNewTodo,
      onKeyDown: ::this.onKeyDown,
      placeholder: 'What needs to be done?'
    };

    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <input { ...inputBoxAttrs }/>
        </header>

        {/* Only if there are todos */}
        { todos.length === 0 ? null : (
          <div>
            <section className='main'>

              {/* Todos */}
              <ul className='todo-list'>
                { todos.map(({ _id, marked, text, editing }) => {
                  let onEditKeyDown = this.editTodo.bind(this, _id);

                  let editTodoInputAttrs = {
                    autoFocus: true,
                    type: 'text',
                    defaultValue: text,
                    onKeyDown: onEditKeyDown
                  };

                  let markTodoInputAttrs = {
                    className:'toggle',
                    type: 'checkbox',
                    checked: marked,
                    onChange: () => markTodo(_id)
                  };

                  return (
                    <li key={ _id } className={ classes({ completed: marked }) }>
                      <div className='view'>
                        <input { ...markTodoInputAttrs }/>
                        { editing
                          ? <input { ...editTodoInputAttrs }/>
                          : <label onDoubleClick={ () => startEdition(_id) }>{ text }</label>
                        }
                        <button className='destroy' onClick={ () => deleteTodo(_id) }/>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
            <footer className='footer'>
              <span className='todo-count'>
                <strong>{ pendingTodos.length }</strong>
                <span>{ ` ${pluralize('item', pendingTodos.length)} left`}</span>
              </span>
              <button className='clear-completed' onClick={ ::this.clearTodos }>
                Clear completed
              </button>
            </footer>
          </div>
        )}
      </section>
    );
  }
}
