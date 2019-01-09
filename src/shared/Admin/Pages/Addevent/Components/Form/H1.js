import React from "react";

export default class H1 extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(event) {
    event.preventDefault();
    let { input } = event.target;
    let { value } = input;
    if (!value) {
      input.style.border = "1px solid red";
    } else {
      this.props.addData("h1", value);
    }
  }
  render() {
    return (
      <form onSubmit={this.submit} className="form h1">
        <input name="input" placeholder="Главный заголовок" type="text" />
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}
