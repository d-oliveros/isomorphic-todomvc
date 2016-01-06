import React from 'react';
import { branch } from 'baobab-react/decorators';
import classes from 'classnames';
import pluralize from 'pluralize';
import { chain } from 'lodash';
import { Todo as TodoActions } from '../actions';

@branch({
  cursors: {
    todos: ['$viewingTodos']
  },
  actions: {
    createTodo: TodoActions.create,
    editTodo: TodoActions.edit,
    startEdition: TodoActions.startEdition,
    deleteTodo: TodoActions.remove,
    markTodo: TodoActions.mark
  }
})

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newTodo: '' };
  }

  editNewTodo(e) {
    const newTodo = e.target.value;
    this.setState({ newTodo });
  }

  clearTodos() {
    const { todos, actions: { deleteTodo } } = this.props;

    chain(todos)
      .filter((todo) => todo.marked)
      .pluck('_id')
      .forEach(deleteTodo);
  }

  editTodo(_id, e) {
    const code = e.keyCode || e.which;

    if (code === 13) {
      this.props.actions.editTodo(_id, e.target.value);
    }
  }

  async onKeyDown(e) {
    const code = e.keyCode || e.which;
    const { newTodo } = this.state;

    if (code === 13) {
      await this.props.actions.createTodo(newTodo);
      this.setState({ newTodo: '' });
    }
  }

  render() {
    const { todos, actions: { markTodo, deleteTodo, startEdition } } = this.props;
    const { newTodo } = this.state;
    const pendingTodos = todos.filter((todo) => !todo.marked);

    const inputBoxAttrs = {
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
                  const onEditKeyDown = this.editTodo.bind(this, _id);

                  const editTodoInputAttrs = {
                    autoFocus: true,
                    type: 'text',
                    defaultValue: text,
                    onKeyDown: onEditKeyDown
                  };

                  const markTodoInputAttrs = {
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
