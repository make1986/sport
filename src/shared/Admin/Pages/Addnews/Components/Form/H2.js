import React from "react";

export default class H1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    if (this.props.body) {
      this.setState({ data: this.props.body });
    }
  }
  submit(event) {
    event.preventDefault();
    let { input } = event.target;
    let { value } = input;
    if (!value) {
      input.style.border = "1px solid red";
    } else {
      this.props.addData("h2", value);
    }
  }
  render() {
    return (
      <form onSubmit={this.submit} className="form h1">
        <input
          defaultValue={this.state.data}
          name="input"
          placeholder="Заголовок абзаца"
          type="text"
        />
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}
