import React from "react";

export default class Lider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
  }
  change(event) {
    this.setState({ value: event.target.value });
  }
  submit(event) {
    event.preventDefault();
    let { input } = event.target;
    let { value } = this.state;
    if (!value || value.length < 100 || value.length > 200) {
      input.style.border = "1px solid red";
    } else {
      this.props.addData("lider", value);
    }
  }
  render() {
    let { length } = this.state.value;
    return (
      <form onSubmit={this.submit} className="form lider">
        <div className="textarea">
          <textarea
            name="input"
            placeholder="От 100 до 200 символов"
            onChange={this.change}
          />
          <span
            className={length < 100 || length > 200 ? "length err" : "length"}
          >
            {length}
          </span>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}
