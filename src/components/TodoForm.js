import React, { Component } from "react";

export default class TodoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
    };
  }

  onChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.input !== "") {
      this.props.addTodo(this.state.input);
    }
    this.setState({
      input: "",
    });
  };

  handleClearTodos = (e) => {
    e.preventDefault();
    this.props.clearTodos();
  };

  handleClearStorage = (e) => {
    e.preventDefault();
    this.props.clearStorage();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.input}
          placeholder="Enter Todo..."
        />
        <button type="submit">Add Todo</button>
        <button onClick={this.handleClearTodos}>Clear Completed</button>
        <button onClick={this.handleClearStorage}>Clear All Todos</button>
      </form>
    );
  }
}
