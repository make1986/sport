import React from "react";
import { Redirect } from "react-router-dom";

import { addBlog } from "../../api";

import Menu from "./Components/Menu";
import Form from "./Components/Form";
import Preview from "./Components/Preview/index";

export default class AddNewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: "",
      lider: "",
      genImg: "",
      activeForm: "",
      editForm: {},
      editedIdx: -1,
      redirect: false
    };
    this.openForm = this.openForm.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.addData = this.addData.bind(this);
    this.editData = this.editData.bind(this);
    this.delData = this.delData.bind(this);
    this.upDown = this.upDown.bind(this);
  }
  openForm(slug) {
    if (slug.edit) {
      let { idx } = slug;
      let editForm = this.state.data[idx];
      this.setState({ editForm, editedIdx: idx }, function() {
        document.body.style.overflowY = "hidden";
      });
    } else {
      this.setState({ activeForm: slug, editForm: {} }, function() {
        if (slug === "") {
          document.body.style.overflowY = "auto";
        } else {
          document.body.style.overflowY = "hidden";
        }
      });
    }
  }
  upDown(idx, type) {
    let { data } = this.state;
    let block = data[idx];
    if (type === "up" && idx > 0) {
      data.splice(idx, 1);
      data.splice(idx - 1, 0, block);
      this.setState({ data });
    } else if (type === "down" && idx < data.length - 1) {
      data.splice(idx, 1);
      data.splice(idx + 1, 0, block);
      this.setState({ data });
    }
  }
  delData(idx) {
    let { data } = this.state;
    data.splice(idx, 1);
    this.setState({ data });
  }
  editData(type, body) {
    let { editedIdx, data } = this.state;
    data.splice(editedIdx, 1, { type, body });
    this.setState({ data, editedIdx: -1, editForm: {} }, function() {
      document.body.style.overflowY = "auto";
    });
  }
  addData(type, body) {
    if (type === "h1") {
      this.setState({ title: body, activeForm: "" }, function() {
        document.body.style.overflowY = "auto";
      });
    } else if (type === "lider") {
      this.setState({ lider: body, activeForm: "" }, function() {
        document.body.style.overflowY = "auto";
      });
    } else if (type === "gen-img") {
      this.setState({ genImg: body, activeForm: "" }, function() {
        document.body.style.overflowY = "auto";
      });
    } else {
      let { data } = this.state;
      data.push({ type, body });
      this.setState({ data, activeForm: "" }, function() {
        document.body.style.overflowY = "auto";
      });
    }
  }
  saveForm() {
    let { data, title, lider, genImg } = this.state;
    let { addError } = this.props;
    if (!title) {
      addError("Необходимо написать главный заголовок!");
    } else if (!lider) {
      addError("Необходимо написать лидер абзац!");
    } else if (!genImg) {
      addError("Главное изображение не выбрано!");
    } else if (data.length === 0) {
      addError(
        "Тело статьи пустое! Напишите хотя бы один абзац или заголовок!"
      );
    } else {
      addBlog({ body: data, title, lider, genImg }).then(res => {
        if (res.status === 200 && res.data.ok) {
          this.setState({ redirect: true });
        } else {
          addError("Ошибка сервера, попробуйте позже!");
        }
      });
    }
  }
  render() {
    const { openForm, saveForm, addData, editData, delData, upDown } = this;
    const {
      activeForm,
      data,
      title,
      lider,
      genImg,
      editForm,
      redirect
    } = this.state;
    const { addError } = this.props;
    if (redirect) {
      return <Redirect to="/admin/news" />;
    } else {
      return (
        <div className="page__container add-news">
          <Menu openForm={openForm} saveForm={saveForm} />
          {activeForm || editForm.type ? (
            <Form
              addError={addError}
              addData={addData}
              openForm={openForm}
              activeForm={activeForm}
              editForm={editForm}
              editData={editData}
            />
          ) : (
            ""
          )}
          <Preview
            openForm={openForm}
            data={data}
            title={title}
            lider={lider}
            genImg={genImg}
            delData={delData}
            upDown={upDown}
          />
        </div>
      );
    }
  }
}
