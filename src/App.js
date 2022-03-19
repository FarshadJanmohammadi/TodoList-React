import React, { Component } from "react";
import Ui from "./components/Ui";

class App extends Component {
  state = { items: [], item: "", itemid: 0, alertMassage: [], showAlert: false };

  componentDidUpdate = () => {
    if (this.state.showAlert === true) {
      setTimeout(() => {
        this.setState({ showAlert: false });
      }, 500);
    }
  };
  componentDidMount = () => {
    const newItems = [...this.state.items];
    const keys = Object.keys(localStorage).sort((a, b) => a - b);
    keys.forEach((key) => {
      const saved = JSON.parse(localStorage.getItem(key));
      newItems.push(saved);
    });
    this.setState({ items: newItems, item: "" });
  };
  render() {
    return (
      <Ui
        todoItems={this.state}
        onChangeState={this.changeState}
        onCreate={this.handleCreateNewTodo}
        onDelete={this.handleDelete}
        onEdite={this.handleEdite}
        onDeleteAll={this.handleDeleteAll}
      />
    );
  }

  changeState = (event) => {
    const inputValue = event.target.value;
    this.setState({ item: inputValue });
  };

  handleCreateNewTodo = () => {
    console.log("first");
    const newState = { ...this.state };
    const { items, item, itemid, alertMassage } = newState;
    const newMassage = {
      id: 1,
      massage: "لطفا یک عنوان برای کار موردنظر خود وارد نمایید.",
    };

    alertMassage[0] = newMassage;
    this.setState({ alertMassage, showAlert: true });
    if (itemid === 0 && item !== "") {
      const newTodo = { id: new Date().getTime(), todoTitle: item };

      localStorage.setItem(newTodo.id, JSON.stringify(newTodo));
      // const getItem = JSON.parse(localStorage.getItem(newTodo.id));
      items.push(newTodo);
      this.setState({ items, item: "", alertMassage, showAlert: true });

      const newMassage = {
        id: 2,
        massage: "یک مورد جدید به لیست کار‌ها اضافه شد.",
      };
      alertMassage[0] = newMassage;
    }
    if (itemid !== 0) {
      const newStateEdit = { ...this.state };
      const { items, item, itemid } = newStateEdit;
      const index = items.findIndex((p) => p.id === itemid);
      items[index].todoTitle = item;

      // newTodo.todoTitle = item;

      localStorage.setItem(itemid, JSON.stringify(items[index]));

      const newMassage = {
        id: 3,
        massage: "ویرایش با موفقیت ثبت شد.",
      };
      alertMassage[0] = newMassage;

      this.setState({ items, itemid: 0, item: "", alertMassage, showAlert: true });
    }
  };

  handleDelete = (id) => {
    const newState = [...this.state.items];
    const newStateFiltered = newState.filter((p) => p.id !== id);
    localStorage.removeItem(id);
    const { alertMassage } = this.state;
    const newMassage = {
      id: 4,
      massage: "حذف با موفقیت انجام شد.",
    };
    alertMassage[0] = newMassage;
    this.setState({ items: newStateFiltered, alertMassage, showAlert: true });
  };
  handleEdite = (input, id) => {
    id = Number(id);
    const newState = { ...this.state };
    const { items } = newState;
    // let { item: newItem } = newState;
    items.forEach((p) => {
      if (p.id === id) {
        newState.item = p.todoTitle;
      }
    });
    this.setState({ items, item: newState.item, itemid: id });
    input.current.focus();
  };

  handleDeleteAll = () => {
    localStorage.clear();
    const { alertMassage } = this.state;
    const newMassage = {
      id: 5,
      massage: "تمامی کارها با موفقیت حذف شد.",
    };
    alertMassage[0] = newMassage;
    this.setState({ items: [], item: "", alertMassage, showAlert: true });
  };
}

export default App;
