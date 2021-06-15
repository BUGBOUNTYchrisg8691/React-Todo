import React, { Component } from 'react'

export default class Todo extends Component {
  handleOnChange = () => {
    this.props.toggleTodo(this.props.todo.key)
  }
  render() {
    return (
      <label className="completed">
        { this.props.todo.todo }
        <input
          type="checkbox"
          checked={ this.props.todo.completed }
          onChange={ this.handleOnChange }
        />
        <span className="checkmark"></span>
      </label>
    )
  }
}
