import React from "react";

import "./App.css";

import TodoList from "./components/TodoList";
import Search from "./components/Search";

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor() {
    super();
    // this.addTodo.bind(this)
    this.state = {
      todos: localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [],
      todosCopy: [],
      search: "",
    };
  }

  getInitialState() {
    return localStorage.getItem("todos") !== null
      ? JSON.parse(localStorage.get("todos"))
      : null;
  }

  componentDidMount() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  onSubmit = () => {
    if (this.state.search === "") {
      this.setState({
        todos: [...this.state.todosCopy],
        todosCopy: [],
      });
    } else {
      this.setState({
        todosCopy: [...this.state.todos],
        todos: this.state.todos.filter((todo) => {
          return todo.todo
            .toLowerCase()
            .includes(this.state.search.toLowerCase());
        }),
      });
    }
  };

  onChange = (e) => {
    this.setState({
      todos: [...this.state.todos],
      search: e.target.value,
    });
  };

  addTodo = (e) => {
    e.preventDefault();
    if (this._inputRef.value !== "") {
      let newTodo = {
        todo: this._inputRef.value,
        key: Date.now(),
        completed: false,
      };
      this.setState((prevState) => {
        return {
          todos: prevState.todos.concat(newTodo),
        };
      });

      this._inputRef.value = "";
      localStorage.setItem(
        "todos",
        JSON.stringify(this.state.todos.concat(newTodo))
      );
    }
  };

  toggleTodo = (key) => {
    const newTodos = [...this.state.todos];
    const todo = newTodos.find((todo) => todo.key === key);
    todo.completed = !todo.completed;
    this.setState({ todos: newTodos });
  };

  clearTodos = () => {
    const newTodos = this.state.todos.filter((todo) => !todo.completed);
    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <div className="todo-list-main">
        <h1>Todos</h1>
        Search Todos
        <Search onSubmit={this.onSubmit} onChange={this.onChange} />
        <form onSubmit={this.addTodo}>
          <input
            type="text"
            ref={(todo) => (this._inputRef = todo)}
            placeholder="Enter Todo..."
          />
          <button type="submit">Add Todo</button>
        </form>
        <TodoList todos={this.state.todos} toggleTodo={this.toggleTodo} />
        <button onClick={this.clearTodos}>Clear Completed</button>
      </div>
    );
  }
}

export default App;
