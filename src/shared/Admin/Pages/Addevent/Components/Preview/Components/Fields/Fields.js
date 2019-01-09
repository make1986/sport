import React from "react";

import Field from "./Field";

export default class Feilds extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <div className="fields__container">
        <div className="field">
          <span onClick={this.props.openPopup} className="add-field-button">
            Добавить поле
          </span>
        </div>
        {data && data.length > 0 ? (
          <div className="all-field">
            {data.map(d => (
              <Field moveField={this.props.moveField} key={d} id={d} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
