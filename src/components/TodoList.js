// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React, { Component } from 'react'

import Todo from "./Todo"

export default class TodoList extends Component {
  createTodo = todo => {
    return (
      <Todo key={ todo.key } todo={ todo } toggleTodo={ this.props.toggleTodo } />
    )
  }
  
  render() {
    const todoEntries = this.props.todos
    const listItems = todoEntries.map(this.createTodo)
    return (
      <React.Fragment>
        { listItems }
      </React.Fragment>
    )
  }
}
