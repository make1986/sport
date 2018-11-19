import React from "react";

import config from "../../../../../../server/etc/config";
import { saveImage } from "../../../../api";

export default class BodyImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      value: ""
    };
    this.submit = this.submit.bind(this);
    this.changeFile = this.changeFile.bind(this);
    this.changeText = this.changeText.bind(this);
    this.delImg = this.delImg.bind(this);
  }
  componentDidMount() {
    if (this.props.body) {
      this.setState({
        file: this.props.body.file,
        value: this.props.body.description
      });
    }
  }
  delImg() {
    this.setState({ file: "" });
  }
  changeText(event) {
    this.setState({ value: event.target.value });
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
    let { value, file } = this.state;
    if (!file) {
      this.props.addError("Необходимо загрузить изображение!");
    } else if (value < 10 || value > 100) {
      event.target.input.style.border = "1px solid red";
    } else {
      this.props.addData("img", { file, description: value });
    }
  }
  render() {
    let { file, value } = this.state;
    let { length } = value;
    return (
      <form onSubmit={this.submit} className="form gen-img">
        <div className="gen-img__img">
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
            <label htmlFor="file">Выбрать изображение</label>
          )}
          <input
            className="file"
            name="file"
            onChange={this.changeFile}
            type="file"
            id="file"
          />
        </div>
        <div className="textarea">
          <textarea
            name="input"
            placeholder="Описание изображения. От 10 до 100 символов"
            onChange={this.changeText}
            value={value}
          />
          <span
            className={length < 10 || length > 100 ? "length err" : "length"}
          >
            {length}
          </span>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}
