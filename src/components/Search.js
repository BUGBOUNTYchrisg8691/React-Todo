import React, { Component } from "react";

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      input: "",
    };
  }

  onChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.search(this.state.input);
    this.setState({
      input: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          onChange={this.onChange}
          value={this.state.input}
        />
        <button>Search</button>
      </form>
    );
  }
}
