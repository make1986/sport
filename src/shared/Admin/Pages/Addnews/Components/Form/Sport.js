import React from "react";

import { getSports } from "../../../../api";

export default class Sports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data ? this.props.data : [],
      sports: []
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    getSports().then(res => {
      if (res.ok && res.data) {
        if (res.data.length > 0) {
          this.setState({ sports: res.data });
        } else {
          this.props.addError("Сначала необходимо создать дисциплины!");
        }
      } else {
        this.props.addError("Ошибка сервера, попробуйте позже!");
      }
    });
    if (this.props.body) {
      this.setState({ data: this.props.body });
    }
  }
  change(event) {
    let { data } = this.state;
    let id = event.target.value;
    if (data.indexOf(id) === -1) {
      data.push(id);
    } else {
      data.splice(data.indexOf(id), 1);
    }
    this.setState({ data });
  }
  submit(event) {
    event.preventDefault();
    this.props.addData("sport", this.state.data);
  }
  render() {
    let { sports, data } = this.state;
    return (
      <form onSubmit={this.submit} className="form sports">
        <div className="checkboxed">
          {sports.map(sport => (
            <div className="checkbox" key={sport._id}>
              <label htmlFor={sport._id}>{sport.name}</label>
              <input
                onChange={this.change}
                id={sport._id}
                type="checkbox"
                value={sport._id}
                checked={data.indexOf(sport._id) === -1 ? false : true}
              />
            </div>
          ))}
        </div>
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}
