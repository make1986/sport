import React from "react";

import { getFieldById } from "../../../../../../api";

export default class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    getFieldById(this.props.id).then(res => {
      if (res.ok) {
        this.setState({ data: res.data });
      }
    });
  }
  render() {
    const { data } = this.state;
    if (data && data._id) {
      return (
        <div className="field">
          <span className="name-field">{data.quest}</span>
          <div className="menu">
            <span onClick={() => this.props.moveField("up", data._id)}>
              Выше
            </span>
            <span onClick={() => this.props.moveField("down", data._id)}>
              Ниже
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="field__container">
          <span className="name-field">Ошибка загрузки поля...</span>
        </div>
      );
    }
  }
}
