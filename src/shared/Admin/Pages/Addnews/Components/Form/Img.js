import React from "react";

import config from "../../../../../../server/etc/config";
import { saveImage } from "../../../../api";

export default class Img extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ""
    };
    this.submit = this.submit.bind(this);
    this.changeFile = this.changeFile.bind(this);
    this.delImg = this.delImg.bind(this);
  }
  delImg() {
    this.setState({ file: "" });
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
    let { file } = this.state;
    this.props.addData("gen-img", file);
  }
  render() {
    let { file } = this.state;
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
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}
