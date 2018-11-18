import React from "react";

import Menu from "./Components/Menu";
import Form from "./Components/Form";

export default class AddNewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: "",
      lider: "",
      genImg: "",
      tags: [],
      activeForm: ""
    };
    this.openForm = this.openForm.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.addData = this.addData.bind(this);
  }
  openForm(slug) {
    this.setState({ activeForm: slug }, function() {
      if (slug === "") {
        document.body.style.overflowY = "scroll";
      } else {
        document.body.style.overflowY = "hidden";
      }
    });
  }
  addData(type, body) {
    if (type === "h1") {
      this.setState({ title: body, activeForm: "" });
    } else if (type === "lider") {
      this.setState({ lider: body, activeForm: "" });
    } else if (type === "gen-img") {
      this.setState({ genImg: body, activeForm: "" });
    } else {
      let { data } = this.state;
      data.push({ type, body });
      this.setState({ data, activeForm: "" });
    }
  }
  saveForm() {
    console.log("save");
  }
  render() {
    const { openForm, saveForm, addData } = this;
    const { activeForm } = this.state;
    const { addError } = this.props;
    return (
      <div className="page__container add-news">
        <h3>Add</h3>
        <Menu openForm={openForm} saveForm={saveForm} />
        {activeForm ? (
          <Form
            addError={addError}
            addData={addData}
            openForm={openForm}
            activeForm={activeForm}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
