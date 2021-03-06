import React from "react";
import { Redirect } from "react-router-dom";

import { addEvent, getEventById, editEvent } from "../../api";

import Menu from "../../Components/Menu";
import Form from "./Components/Form";
import Preview from "./Components/Preview/index";

const menu = [
  { slug: "h1", name: "Заголовок", required: true },
  { slug: "lider", name: "Лидер абзац", required: true },
  { slug: "gen-img", name: "Главное изображение", required: true },
  { slug: "sport", name: "Дисциплина", required: false },
  { slug: "h2", name: "Заголовок абзаца", required: false },
  { slug: "paragraph", name: "Абзац", required: false },
  { slug: "img", name: "Изображение", required: false },
  { slug: "gallery", name: "Галерея", required: false }
];

export default class AddNewsPage extends React.Component {
  constructor(props) {
    super(props);
    let data;
    let loadDataServer = false;
    if (__isBrowser__) {
      data = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else if (props.staticContext && props.staticContext.data) {
      data = props.staticContext.data;
    }
    if (data && data.ok && data.data) {
      this.state = {
        data: data.data.body,
        title: data.data.title,
        lider: data.data.lider,
        genImg: data.data.genImg,
        createdAt: data.data.created_at,
        sport: data.data.sport ? data.data.sport : [],
        questionnaire: data.data.questionnaire ? data.data.questionnaire : [],
        activeForm: "",
        editForm: {},
        editedIdx: -1,
        redirect: false
      };
    } else {
      this.state = {
        data: [],
        title: "",
        lider: "",
        genImg: "",
        createdAt: new Date(),
        sport: [],
        questionnaire: [],
        activeForm: "",
        editForm: {},
        editedIdx: -1,
        redirect: false
      };
    }

    this.openForm = this.openForm.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.addData = this.addData.bind(this);
    this.editData = this.editData.bind(this);
    this.delData = this.delData.bind(this);
    this.upDown = this.upDown.bind(this);
    this.moveField = this.moveField.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.match.params && this.props.match.params.id) {
      if (!this.state.data || this.state.data.length === 0) {
        getBlogsById(this.props.match.params.id).then(res => {
          if (res.ok && res.data) {
            this.setState({
              data: res.data.body,
              title: res.data.title,
              lider: res.data.lider,
              genImg: res.data.genImg,
              createdAt: res.data.created_at,
              sport: res.data.sport ? res.data.sport : [],
              questionnaire: res.data.questionnaire
                ? res.data.questionnaire
                : [],
              activeForm: "",
              editForm: {},
              editedIdx: -1,
              redirect: false
            });
          } else {
            this.props.addError(res.data.err);
          }
        });
      }
    }
  }
  moveField(type, id) {
    let { questionnaire } = this.state;
    let idx = questionnaire.indexOf(id);
    switch (type) {
      case "up":
        if (idx > 0) {
          questionnaire.splice(idx, 1);
          questionnaire.splice(idx - 1, 0, id);
        }
        break;
      case "down":
        if (idx < questionnaire.length - 1) {
          questionnaire.splice(idx, 1);
          questionnaire.splice(idx + 1, 0, id);
        }
        break;
    }
    this.setState({ questionnaire });
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
    } else if (type === "questionnaire") {
      this.setState({ questionnaire: body, activeForm: "" }, function() {
        document.body.style.overflowY = "auto";
      });
    } else if (type === "gen-img") {
      this.setState({ genImg: body, activeForm: "" }, function() {
        document.body.style.overflowY = "auto";
      });
    } else if (type === "sport") {
      this.setState({ sport: body, activeForm: "" }, function() {
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
    let { data, title, lider, genImg, sport, questionnaire } = this.state;
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
      if (this.props.match.params && this.props.match.params.id) {
        editEvent({
          questionnaire,
          body: data,
          title,
          lider,
          genImg,
          sport,
          id: this.props.match.params.id
        }).then(res => {
          if (res.status === 200 && res.data.ok) {
            this.setState({ redirect: true });
          } else {
            addError("Ошибка сервера, попробуйте позже!");
          }
        });
      } else {
        addEvent({
          body: data,
          title,
          lider,
          genImg,
          sport,
          questionnaire
        }).then(res => {
          if (res.status === 200 && res.data.ok) {
            this.setState({ redirect: true });
          } else {
            addError("Ошибка сервера, попробуйте позже!");
          }
        });
      }
    }
  }
  render() {
    const {
      openForm,
      saveForm,
      addData,
      editData,
      delData,
      upDown,
      moveField
    } = this;
    const {
      activeForm,
      data,
      title,
      lider,
      genImg,
      editForm,
      redirect,
      createdAt,
      questionnaire,
      sport
    } = this.state;
    const { addError } = this.props;
    if (redirect) {
      return <Redirect to="/admin/events" />;
    } else {
      return (
        <div className="page__container add-news">
          <Menu openForm={openForm} saveForm={saveForm} menu={menu} />
          {activeForm || editForm.type ? (
            <Form
              addError={addError}
              addData={addData}
              openForm={openForm}
              activeForm={activeForm}
              editForm={editForm}
              editData={editData}
              sport={sport}
            />
          ) : (
            ""
          )}
          <Preview
            saveQuest={addData}
            addError={addError}
            createdAt={createdAt}
            openForm={openForm}
            data={data}
            title={title}
            lider={lider}
            genImg={genImg}
            delData={delData}
            upDown={upDown}
            questionnaire={questionnaire}
            moveField={moveField}
          />
        </div>
      );
    }
  }
}
