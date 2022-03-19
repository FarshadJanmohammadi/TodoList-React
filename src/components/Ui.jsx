import React, { Component } from "react";
import Alert from "./Alert";
import ToDo from "./ToDo";
import "./Ui.css";

class Ui extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
  }

  render() {
    const keys = Object.keys(localStorage).sort((a, b) => a - b);

    return (
      <div className="ui-container">
        {this.props.todoItems.alertMassage.length !== 0 && this.props.todoItems.showAlert ? (
          <Alert ref={this.alertRef} alert={this.props.todoItems} />
        ) : (
          <p>&nbsp;</p>
        )}
        <div className="container">
          <h1 className="main-title">مدیریت کارهای روزانه</h1>
          <form>
            <input
              ref={this.myRef}
              type="text"
              placeholder="مثال:خواندن کتاب"
              value={this.props.todoItems.item}
              onChange={this.handleChange}
            />
            <button onClick={this.handleCreateTodo}>ثبت</button>
          </form>
          <div className="todo-item-container">
            {keys.map((key) => (
              <ToDo
                key={key}
                todoItems={JSON.parse(localStorage.getItem(key))}
                onDelete={() => this.props.onDelete(key)}
                onEdite={() => this.props.onEdite(this.myRef, key)}
              />
            ))}
          </div>
          {keys.length !== 0 ? (
            <div className="button-delete-all-container">
              <button onClick={this.handleDeleteAllClick} className="button-delet-all">
                پاک کردن همه
              </button>
            </div>
          ) : null}
        </div>
        <footer>
          <a href="https://github.com/farshadjanmohammadi">
            Made with <i class="fas fa-heart"></i> by Farshad Janmohammadi
          </a>
        </footer>
      </div>
    );
  }

  handleChange = (event) => {
    this.props.onChangeState(event);
  };
  handleCreateTodo = (event) => {
    event.preventDefault();
    this.props.onCreate(event);
  };
  handleDeleteAllClick = () => {
    this.props.onDeleteAll();
  };
}

export default Ui;
