import React from "react";

import { delField } from "../../../../../../api";

import Newfield from "./Newfield";
import Confirmed from "../../../../../../Components/Confirmed";

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.data || [],
      newfield: false,
      delId: ""
    };
    this.changeCheck = this.changeCheck.bind(this);
    this.openNewField = this.openNewField.bind(this);
    this.deletField = this.deletField.bind(this);
    this.openConf = this.openConf.bind(this);
  }
  changeCheck(event) {
    let { checked } = this.state;
    if (event.target.checked) {
      checked.push(event.target.value);
    } else {
      let idx = checked.indexOf(event.target.value);
      checked.splice(idx, 1);
    }
    this.setState({ checked });
  }
  openNewField() {
    this.setState({ newfield: !this.state.newfield });
  }
  openConf(delId) {
    this.setState({ delId });
  }
  deletField(id) {
    delField(id).then(res => {
      if (res.ok) {
        this.setState({ delId: "" }, function() {
          this.props.refreshFields();
        });
      } else {
        this.props.addError(res.err);
      }
    });
  }
  render() {
    const { fields } = this.props;
    const { newfield, delId, checked } = this.state;
    return (
      <div className="popup-fields">
        <div className="popup-fields__container">
          {fields.length > 0 ? (
            <div className="chek-fields">
              {fields.map(field => (
                <div key={field._id} className="chek-fields__item">
                  <span
                    onClick={() => this.openConf(field._id)}
                    className="del-field"
                  >
                    ×
                  </span>
                  <label htmlFor={field._id}>{field.name}</label>
                  <input
                    checked={checked.indexOf(field._id) !== -1 ? true : false}
                    id={field._id}
                    value={field._id}
                    type="checkbox"
                    onChange={this.changeCheck}
                  />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          <span onClick={this.openNewField} className="add-new-field">
            Новое поле
          </span>
          {newfield ? (
            <Newfield
              refreshFields={this.props.refreshFields}
              openNewField={this.openNewField}
              addField={this.props.addField}
              addError={this.props.addError}
            />
          ) : (
            ""
          )}
          <div
            onClick={() => this.props.saveQuest("questionnaire", checked)}
            className="save-all-fields"
          >
            Применить
          </div>
        </div>

        {delId ? (
          <Confirmed
            text="Вы действительно хотите удалить этот вопрос? Если вы это сделаете, то он пропадет во всех регистрациях мероприятий!"
            close={this.openConf}
            id={delId}
            func={this.deletField}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
