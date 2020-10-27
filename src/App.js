import React from "react";

import "./App.css";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor() {
    super();
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

  search = (searchTerm) => {
    if (searchTerm === "") {
      this.setState({
        todos: [...this.state.todosCopy],
        todosCopy: [],
      });
    } else {
      this.setState({
        todosCopy: [...this.state.todos],
        todos: this.state.todos.filter((todo) => {
          return todo.todo.toLowerCase().includes(searchTerm.toLowerCase());
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

  addTodo = (todo) => {
    let newTodo = {
      todo: todo,
      key: Date.now(),
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
    localStorage.setItem(
      "todos",
      JSON.stringify(this.state.todos.concat(newTodo))
    );
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

  clearStorage = () => {
    this.setState({ todos: [] });
    localStorage.clear();
  };

  render() {
    return (
      <div className="todo-list-main">
        <h1>Todos</h1>
        <Search search={this.search} />
        <TodoForm
          addTodo={this.addTodo}
          clearTodos={this.clearTodos}
          clearStorage={this.clearStorage}
        />
        <TodoList todos={this.state.todos} toggleTodo={this.toggleTodo} />
      </div>
    );
  }
}

export default App;
