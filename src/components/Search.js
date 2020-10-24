import React, { Component } from "react";

export default class Search extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          onChange={this.props.onChange}
        />
        <button>Search</button>
      </form>
    );
  }
}
