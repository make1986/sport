import React from "react";

import H1 from "./H1";
import H2 from "./H2";
import Lider from "./Lider";
import Img from "./Img";
import BodyImg from "./BodyImg";
import Gallery from "./Gallery";
import Paragraph from "./Paragraph";
import Sport from "./Sport";

export default class Form extends React.Component {
  render() {
    const {
      activeForm,
      openForm,
      addData,
      addError,
      editForm,
      editData,
      sport
    } = this.props;
    return (
      <div className="add-news__form">
        {activeForm === "h1" ? (
          <H1 addData={addData} />
        ) : activeForm === "lider" ? (
          <Lider addData={addData} />
        ) : activeForm === "gen-img" ? (
          <Img addError={addError} addData={addData} />
        ) : activeForm === "img" ? (
          <BodyImg addError={addError} addData={addData} />
        ) : activeForm === "gallery" ? (
          <Gallery addError={addError} addData={addData} />
        ) : activeForm === "h2" ? (
          <H2 addData={addData} />
        ) : activeForm === "paragraph" ? (
          <Paragraph addData={addData} />
        ) : activeForm === "sport" ? (
          <Sport data={sport} addError={addError} addData={addData} />
        ) : editForm && editForm.type === "h2" ? (
          <H2 addData={editData} body={editForm.body} />
        ) : editForm && editForm.type === "paragraph" ? (
          <Paragraph addData={editData} body={editForm.body} />
        ) : editForm && editForm.type === "img" ? (
          <BodyImg
            addError={addError}
            addData={editData}
            body={editForm.body}
          />
        ) : editForm && editForm.type === "gallery" ? (
          <Gallery
            addError={addError}
            addData={editData}
            body={editForm.body}
          />
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
