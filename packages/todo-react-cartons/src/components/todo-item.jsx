import * as React from 'react';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;


export default class TodoItem extends React.Component {
  state = {
    editing: false
  }

  renderEditing () {
    return (
      <input
        className="edit"
        type="text"
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChangeEditText}
        value={this.state.editText}
        autoFocus={true}
      />
    );
  }

  renderStatic () {
    const { todo } = this.props;
    return (
      <div>
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={todo.actions.toggleComplete}
        />
        <label onDoubleClick={this.handleToEdit}>
          {todo.title}
        </label>
        <button className="destroy" onClick={this.handleDestroy} />
      </div>
    );
  }

  render () {
    const {
      editing
    } = this.state;
    const {
      todo
    } = this.props;
    return (
      <div
        className={`todo-item${editing ? ' editing' : ''}${todo.completed ? ' completed' : ''}`}
      >
        {editing
          ? (this.renderEditing())
          : (this.renderStatic())
        }
      </div>
    )
  }

  handleDestroy = () => {
    const {
      remove,
      todo
    } = this.props;
    remove(todo);
  }

  handleToEdit = () => {
    this.setState({
      editing: true,
      editText: this.props.todo.title
    })
  }

  handleChangeEditText = (event) => {
    this.setState({ editText: event.target.value });
  }

  handleKeyDown = (event) => {
    if (event.which === ESCAPE_KEY) {
      this.cancelEdit();
      event.preventDefault();
    } else if (event.which === ENTER_KEY) {
      this.editComplete();
      event.preventDefault();
    }
  }

  cancelEdit () {
    this.setState({ editing: false });
  }

  editComplete () {
    this.setState({ editing: false });
    this.props.todo.actions.editTodo(this.state.editText);
  }
}
