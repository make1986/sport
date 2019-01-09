import React from "react";

import { getFields, addField } from "../../../../../api";

import Popup from "./Fields/Popup";
import Fields from "./Fields/Fields";

export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      classes: "fields",
      popup: false,
      fields: []
    };
    this.openQuest = this.openQuest.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.refreshFields = this.refreshFields.bind(this);
    this.saveQuest = this.saveQuest.bind(this);
  }
  componentDidMount() {
    getFields().then(res => {
      if (!res.ok) {
        this.props.addError(
          "Произошла ошибка при загрузке полей вопросов. Обратитесь к разработчику!"
        );
      } else {
        this.setState({ fields: res.data });
      }
    });
  }
  refreshFields() {
    getFields().then(res => {
      if (!res.ok) {
        this.props.addError(
          "Произошла ошибка при загрузке полей вопросов. Обратитесь к разработчику!"
        );
      } else {
        this.setState({ fields: res.data });
      }
    });
  }
  openQuest() {
    let { classes } = this.state;
    if (classes === "fields") {
      this.setState({ classes: "fields active" });
    } else {
      this.setState({ classes: "fields" });
    }
  }
  openPopup() {
    this.setState({ popup: !this.state.popup }, function() {
      if (this.state.popup) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    });
  }
  saveQuest(type, data) {
    this.setState({ popup: false }, function() {
      this.props.saveQuest(type, data);
    });
  }
  render() {
    const { classes, data, popup, fields } = this.state;
    return (
      <div className="questions">
        <div className="questions__container">
          <span onClick={this.openQuest} className="open-quest">
            Регистрация участника
          </span>
          <div className={classes}>
            <Fields
              moveField={this.props.moveField}
              data={this.props.data}
              openPopup={this.openPopup}
            />
          </div>
          {popup ? (
            <Popup
              saveQuest={this.saveQuest}
              refreshFields={this.refreshFields}
              addField={addField}
              addError={this.props.addError}
              fields={fields}
              data={this.props.data}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
