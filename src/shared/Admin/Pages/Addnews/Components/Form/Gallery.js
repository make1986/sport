import React from "react";

import config from "../../../../../../server/etc/config";
import { saveArrayImage } from "../../../../api";

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: []
    };
    this.submit = this.submit.bind(this);
    this.changeFile = this.changeFile.bind(this);
    this.delImg = this.delImg.bind(this);
  }
  componentDidMount() {
    if (this.props.body) {
      this.setState({ file: this.props.body });
    }
  }
  delImg(idx) {
    let { file } = this.state;
    file.splice(idx, 1);
    this.setState({ file });
  }
  changeFile(event) {
    let file = event.target.files;
    let formData = new FormData();
    for (var i = 0; i < file.length; i++) {
      formData.append("file[]", file[i]);
    }
    saveArrayImage(formData).then(res => {
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
          let { file } = this.state;
          file = [...file, ...res.data.filename];
          this.setState({ file });
        }
      } else {
        this.props.addError("Ошибка сервера, попробуйте позже!");
      }
    });
  }
  submit(event) {
    event.preventDefault();
    let { file } = this.state;
    this.props.addData("gallery", file);
  }
  render() {
    let { file } = this.state;
    return (
      <form
        encType="multipart/form-data"
        onSubmit={this.submit}
        className="form gen-img"
      >
        <div className="gen-img__img">
          {file ? (
            <div className="images">
              {file.map((f, idx) => (
                <div key={f} className="img">
                  <img
                    src={`${config.API_PREFIX}/Uploads/Images/${f}`}
                    alt="Не удалось загрузить изображение"
                  />
                  <span className="del-img" onClick={() => this.delImg(idx)}>
                    ×
                  </span>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="file">
            {file.length > 0 ? "Загрузить еще" : "Загрузить изображения"}
          </label>
          <span className="tip">
            Вы можете загружать до 50 изображений одновременно
          </span>
          <input
            className="file"
            name="file[]"
            onChange={this.changeFile}
            type="file"
            id="file"
            multiple
          />
        </div>
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}
