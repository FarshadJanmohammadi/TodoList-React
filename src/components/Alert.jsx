import React, { Component } from "react";
import "./Alert.css";

class Alert extends Component {
  state = {};

  render() {
    const alert = this.props.alert.alertMassage;
    return (
      <p
        style={
          alert[0].id === 1 || alert[0].id === 4 || alert[0].id === 5
            ? {
                color: "#e74c3c",
              }
            : { color: "#27ae60" }
        }
      >
        {alert[0].massage}
      </p>
    );
  }
}

export default Alert;
