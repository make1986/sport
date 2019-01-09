import React from "react";

import Setting from "./Setting";

export default class Newfield extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      options: []
    };
    this.changeType = this.changeType.bind(this);
    this.addOption = this.addOption.bind(this);
    this.saveField = this.saveField.bind(this);
  }
  changeType(event) {
    this.setState({ type: event.target.value });
  }
  addOption(options) {
    this.setState({ options });
  }
  saveField() {
    let { name, quest, own, required } = this;
    let { type, options } = this.state;
    let data = new Object();
    let err = [];
    data.required = required.checked;
    if (!name.value) {
      err.push(" название");
    } else {
      data.name = name.value;
    }
    if (!type) {
      err.push(" тип вопроса");
    } else {
      data.type = type;
    }
    if (!quest.value) {
      err.push(" вопрос");
    } else {
      data.quest = quest.value;
    }
    if (type !== "oneof" && type !== "fewof") {
      data.own = false;
    } else {
      data.own = own.checked;
    }
    if ((type === "oneof" || type === "fewof") && options.length === 0) {
      err.push(" варианты ответа");
    } else {
      data.options = options;
    }
    if (err.length > 0) {
      this.props.addError(`Вы не запонлили ${err.join()}!`);
    } else {
      this.props.addField(data).then(res => {
        if (res.status === 200 && res.data.ok) {
          this.props.openNewField();
          this.props.refreshFields();
        } else {
          this.props.addError(`Ошибка сервера, попробуйте позже!`);
        }
      });
    }
  }

  render() {
    const { type, options } = this.state;
    return (
      <div className="new-field">
        <div className="new-field__quest">
          <input
            ref={n => (this.name = n)}
            name="name"
            type="text"
            placeholder="Название поля(видно только администратору)"
          />
        </div>
        <div className="new-field__quest">
          <input
            ref={q => (this.quest = q)}
            name="quest"
            type="text"
            placeholder="Вопрос"
          />
        </div>
        <form onChange={this.changeType} className="new-field__type">
          <div>
            <input type="radio" name="type" id="text" value="text" />
            <label htmlFor="text">Текст</label>
          </div>
          <div>
            <input type="radio" name="type" id="date" value="date" />
            <label htmlFor="date">Дата</label>
          </div>
          <div>
            <input type="radio" name="type" id="oneof" value="oneof" />
            <label htmlFor="oneof">Один из</label>
          </div>
          <div>
            <input type="radio" name="type" id="fewof" value="fewof" />
            <label htmlFor="fewof">Несколько из</label>
          </div>
          <div>
            <input type="radio" name="type" id="phone" value="phone" />
            <label htmlFor="phone">Телефон</label>
          </div>
        </form>
        {type && type !== "phone" && type !== "text" && type !== "date" ? (
          <div>
            {options.length === 0 ? (
              <Setting addOption={this.addOption} type={type} />
            ) : (
              <div className="all-options">
                <h3>Варианты ответов:</h3>
                {options.map((option, idx) => (
                  <span key={option + idx}>{option}</span>
                ))}
              </div>
            )}
            <div className="own">
              <input
                ref={o => (this.own = o)}
                type="checkbox"
                id="own"
                name="own"
              />
              <label htmlFor="own">Разрешить свой вариант</label>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="req">
          <input
            ref={r => (this.required = r)}
            type="checkbox"
            id="req"
            name="req"
          />
          <label htmlFor="req">Обязательное поле</label>
        </div>
        <span onClick={this.saveField} className="save-field">
          Сохранить
        </span>
      </div>
    );
  }
}
