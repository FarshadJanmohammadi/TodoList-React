import React, { Component } from "react";
import "./ToDo.css";

class ToDo extends Component {
  state = {};
  render() {
    return (
      <div className="todo-container">
        <h1>{this.props.todoItems.todoTitle}</h1>
        <button onClick={this.props.onEdite}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={this.props.onDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    );
  }
}

export default ToDo;
