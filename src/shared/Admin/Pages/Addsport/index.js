import React from "react";
import { Redirect } from "react-router-dom";

import { saveImage, addSport, getSportById, editSport } from "../../api";
import config from "../../../../server/etc/config";

export default class AddSportPage extends React.Component {
  constructor(props) {
    super(props);
    let data;
    if (__isBrowser__) {
      data = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else if (props.staticContext && props.staticContext.data) {
      data = props.staticContext.data;
    }
    this.state = {
      file: data && data.data && data.data.img ? data.data.img : "",
      value: data && data.data && data.data.desc ? data.data.desc : "",
      name: data && data.data && data.data.name ? data.data.name : "",
      video: data && data.data && data.data.video ? data.data.video : "",
      redirect: false
    };
    this.submit = this.submit.bind(this);
    this.changeFile = this.changeFile.bind(this);
    this.changeText = this.changeText.bind(this);
    this.delImg = this.delImg.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.match.params && this.props.match.params.id) {
      if (!this.state.data || this.state.data.length === 0) {
        getSportById(this.props.match.params.id).then(res => {
          if (res.ok && res.data) {
            this.setState({
              file: res.data.img,
              value: res.data.desc,
              name: res.data.name,
              video: res.data.video
            });
          } else {
            this.props.addError(res.data.err);
          }
        });
      }
    }
  }
  delImg() {
    this.setState({ file: "" });
  }
  changeText(event) {
    this.setState({ value: event.target.value });
  }
  changeInput(event) {
    let { name, value } = event.target;
    switch (name) {
      case "name":
        this.setState({ name: value });
        break;
      case "video":
        this.setState({ video: value });
        break;
    }
  }
  changeFile(event) {
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", file, file.name);
    saveImage(formData).then(res => {
      if (res.status === 200) {
        if (!res.data.ok) {
          if (
            res.data.err &&
            res.data.err.code &&
            res.data.err.code === "EXTENTION"
          ) {
            this.props.addError(
              "Можно загружать файлы с расширениями JPG, JPEG, PNG!"
            );
          } else if (
            res.data.err &&
            res.data.err.code &&
            res.data.err.code === "LIMIT_FILE_SIZE"
          ) {
            this.props.addError(
              "Загружаемая картинка не должна превышать 5MB!"
            );
          } else {
            this.props.addError("Ошибка сервера, попробуйте позже!");
          }
        } else {
          this.setState({ file: res.data.filename });
        }
      } else {
        this.props.addError("Ошибка сервера, попробуйте позже!");
      }
    });
  }
  submit(event) {
    event.preventDefault();
    let { file, name, video, value } = this.state;
    if (!file || !name || !video || !value) {
      this.props.addError("Все поля должны быть заполнены!");
    } else {
      if (this.props.match.params && this.props.match.params.id) {
        editSport({
          img: file,
          name,
          video,
          desc: value,
          id: this.props.match.params.id
        }).then(res => {
          if (!res.data.ok) {
            this.props.addError("Ошибка сервера, попробуйте позже!");
          } else {
            this.setState({ redirect: true });
          }
        });
      } else {
        addSport({ img: file, name, video, desc: value }).then(res => {
          if (!res.data.ok) {
            this.props.addError("Ошибка сервера, попробуйте позже!");
          } else {
            this.setState({ redirect: true });
          }
        });
      }
    }
  }
  render() {
    const { value, file, name, video, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/admin/sport" />;
    } else {
      return (
        <div className="page__container add-sport">
          <form onSubmit={this.submit}>
            <input
              onChange={this.changeInput}
              value={name}
              type="text"
              placeholder="Название"
              name="name"
            />
            <textarea
              onChange={this.changeText}
              value={value}
              placeholder="Описание"
              name="desc"
            />
            <input
              onChange={this.changeInput}
              value={video}
              type="text"
              placeholder="Видео на Youtube"
              name="video"
            />
            <input
              onChange={this.changeFile}
              type="file"
              id="file"
              name="file"
            />
            {file ? (
              <div className="img">
                <img
                  src={`${config.API_PREFIX}/Uploads/Images/${file}`}
                  alt="Не удалось загрузить изображение"
                />
                <span className="del-img" onClick={this.delImg}>
                  ×
                </span>
              </div>
            ) : (
              <label htmlFor="file">Загрузить изображение</label>
            )}
            <button type="submit">Сохранить</button>
          </form>
        </div>
      );
    }
  }
}
