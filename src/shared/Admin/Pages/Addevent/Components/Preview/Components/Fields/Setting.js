import React from "react";

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [0]
    };
    this.change = this.change.bind(this);
    this.addOption = this.addOption.bind(this);
    this.delOption = this.delOption.bind(this);
  }
  change(event) {
    event.preventDefault();
    let data = [];
    let err = [];
    for (var i = 0; i < event.target.elements.length; i++) {
      let element = event.target.elements[i];
      if (element.type === "text") {
        if (element.value) {
          data.push(element.value);
          element.style.border = "1px solid #222";
        } else {
          err.push(element);
        }
      }
    }
    if (err.length > 0) {
      err.map(er => {
        er.style.border = "1px solid red";
      });
    } else {
      this.props.addOption(data);
    }
  }
  addOption() {
    let { options } = this.state;
    this.setState({ options: [...options, new Date()] });
  }
  delOption(option) {
    let { options } = this.state;
    let idx = options.indexOf(option);
    options.splice(idx, 1);
    this.setState({ options });
  }
  render() {
    const { type } = this.props;
    const { options } = this.state;
    return (
      <div className="new-field__setting">
        <h3>Варианты ответов:</h3>
        <form onSubmit={this.change}>
          {options.map((option, idx) => (
            <div key={option}>
              <input type="text" name={option} />
              {option > 0 ? (
                <span
                  className="del-option"
                  onClick={() => this.delOption(option)}
                >
                  Удалить
                </span>
              ) : (
                ""
              )}
            </div>
          ))}
          <span onClick={this.addOption} className="add-option">
            Еще вариант
          </span>
          <button type="submit">Сохранить варианты</button>
        </form>
      </div>
    );
  }
}
