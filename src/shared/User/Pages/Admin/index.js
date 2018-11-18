import React from "react";

import { checkAdmin, addSuperuser, checkAuth } from "../../api";

import Eyes from "./Components/Eyes";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: "password" };
    this.viewPass = this.viewPass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    checkAuth().then(res => {
      if (res.status !== 200) {
        this.props.addError("Ошибка сервера, попробуйте !");
      } else {
        if (res.data.auth === true) {
          window.location.replace(`/admin/`);
        }
      }
    });
  }
  viewPass() {
    if (this.state.password === "password") {
      this.setState({ password: "text" });
    } else {
      this.setState({ password: "password" });
    }
  }
  onSubmit(event) {
    event.preventDefault();
    const { login, password } = event.target;
    if (!login.value) {
      login.style.border = "1px solid red";
    } else {
      login.style.border = "1px solid #dcdcdc";
    }
    if (!password.value) {
      password.style.border = "1px solid red";
    } else {
      password.style.border = "1px solid #dcdcdc";
    }
    if (login.value && password.value) {
      checkAdmin({ login: login.value, password: password.value }).then(res => {
        if (res.status !== 200) {
          this.props.addError("Ошибка сервера, попробуйте !");
        } else {
          if (!res.data.ok) {
            this.props.addError(res.data.err);
          } else {
            window.location.replace(`/admin/`);
          }
        }
      });
      // addSuperuser();
    }
  }
  render() {
    const { password } = this.state;
    const { viewPass, onSubmit } = this;
    return (
      <div className="page__container admin">
        <form onSubmit={onSubmit}>
          <div>
            <input name="login" type="text" placeholder="Логин" />
          </div>
          <div>
            <input name="password" type={password} placeholder="Пароль" />
            <Eyes click={viewPass} password={password} />
          </div>
          <button type="submit">Войти</button>
        </form>
      </div>
    );
  }
}
