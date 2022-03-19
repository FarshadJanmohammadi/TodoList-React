import React, { Component } from "react";
import Ui from "./components/Ui";
import { ToastContainer, toast } from "react-toastify";

class App extends Component {
  state = { items: [], item: "", itemid: 0 };

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
      <>
        <Ui
          todoItems={this.state}
          onChangeState={this.changeState}
          onCreate={this.handleCreateNewTodo}
          onDelete={this.handleDelete}
          onEdite={this.handleEdite}
          onDeleteAll={this.handleDeleteAll}
        />
        <ToastContainer />
      </>
    );
  }

  changeState = (event) => {
    const inputValue = event.target.value;
    this.setState({ item: inputValue });
  };

  handleCreateNewTodo = () => {
    const newState = { ...this.state };
    const { items, item, itemid } = newState;
    if (item === "" || item === " ") {
      toast.error("یک عنوان برای کار موردنظر وارد نمایید.", {
        position: "top-center",
        closeOnClick: true,
        autoClose: 1000,
        closeButton: true,
      });
    }
    if (itemid === 0 && item !== "" && item !== " ") {
      const newTodo = { id: new Date().getTime(), todoTitle: item };
      localStorage.setItem(newTodo.id, JSON.stringify(newTodo));
      items.push(newTodo);
      this.setState({ items, item: "" });
      toast.success("یک مورد با موفقیت اضافه شد.", {
        position: "top-center",
        closeOnClick: true,
        autoClose: 2000,
        closeButton: true,
      });
    }
    if (itemid !== 0) {
      const newStateEdit = { ...this.state };
      const { items, item, itemid } = newStateEdit;
      const index = items.findIndex((p) => p.id === itemid);
      items[index].todoTitle = item;

      localStorage.setItem(itemid, JSON.stringify(items[index]));

      this.setState({ items, itemid: 0, item: "" });
      toast.success("ویرایش با موفقیت ثبت شد", {
        position: "top-center",
        closeOnClick: true,
        autoClose: 2000,
        closeButton: true,
      });
    }
  };

  handleDelete = (id) => {
    const newState = [...this.state.items];
    const newStateFiltered = newState.filter((p) => p.id !== id);
    localStorage.removeItem(id);

    this.setState({ items: newStateFiltered });
    toast.error("مورد مورد نظر با موفقیت حذف شد", {
      position: "top-center",
      closeOnClick: true,
      autoClose: 1000,
      closeButton: true,
    });
  };
  handleEdite = (input, id) => {
    id = Number(id);
    const newState = { ...this.state };
    const { items } = newState;
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
    this.setState({ items: [], item: "" });
    toast.error("تمامی موارد با موفقیت حذف شدند.", {
      position: "top-center",
      closeOnClick: true,
      autoClose: 2000,
      closeButton: true,
    });
  };
}

export default App;
