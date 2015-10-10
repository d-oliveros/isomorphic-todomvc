import React from 'react';
import { branch } from 'baobab-react/decorators';
import { Todo as TodoActions } from '../actions';

@branch({
  cursors: {
    todos: ['$viewingTodos']
  },
  actions: {
    createTodo: TodoActions.create,
    deleteTodo: TodoActions.delete,
    markTodo: TodoActions.mark
  }
})

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newTodo: '' };
  }

  editTodo(e) {
    let newTodo = e.target.value;
    this.setState({ newTodo });
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
    let { todos, actions: { markTodo, deleteTodo } } = this.props;
    let { newTodo } = this.state;

    return (
      <div classNames='todos-box'>
        {/* Todo input box */}
        <input
          value={ newTodo }
          onChange={ ::this.editTodo }
          onKeyDown={ ::this.onKeyDown }
          placeholder='What needs to be done?'/>

          {/* Todos */}
          <ul className='todos'>
            { todos.map(({ _id, active, text }) => {
              return (
                <li key={ _id } className={ `todo ${active ? 'active' : ''}` }>
                  <div className='mark' onClick={ () => markTodo(_id) }/>
                  <span>{ text } - </span>
                  <span className='delete' onClick={ () => deleteTodo(_id) }>delete</span>
                </li>
              );
            })}
          </ul>
      </div>
    );
  }
}
