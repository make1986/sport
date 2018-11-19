import React from "react";

export default class Paragraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
  }
  componentDidMount() {
    if (this.props.body) {
      this.setState({ value: this.props.body });
    }
  }
  change(event) {
    this.setState({ value: event.target.value });
  }
  submit(event) {
    event.preventDefault();
    let { input } = event.target;
    let { value } = this.state;
    if (!value) {
      input.style.border = "1px solid red";
    } else {
      this.props.addData("paragraph", value);
    }
  }
  render() {
    let { value } = this.state;
    let { length } = value;
    return (
      <form onSubmit={this.submit} className="form paragraph">
        <div className="textarea">
          <textarea name="input" onChange={this.change} value={value} />
          <span className="length">{length}</span>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}
