import React from "react";

import H1 from "./H1";
import Lider from "./Lider";
import Img from "./Img";

export default class Form extends React.Component {
  render() {
    const { activeForm, openForm, addData, addError } = this.props;
    return (
      <div className="add-news__form">
        {activeForm === "h1" ? (
          <H1 addData={addData} />
        ) : activeForm === "lider" ? (
          <Lider addData={addData} />
        ) : activeForm === "gen-img" ? (
          <Img addError={addError} addData={addData} />
        ) : (
          ""
        )}
        <div className="close" onClick={() => openForm("")}>
          ×
        </div>
      </div>
    );
  }
}
