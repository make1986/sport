import React from "react";
import { Link } from "react-router-dom";

import { logoutAdmin } from "../../api";
import config from "../../../../server/etc/config";

const menu = [
  { name: "Новости", url: "/admin/news" },
  { name: "События", url: "/admin/events" },
  { name: "Секции", url: "/admin/sport" },
  { name: "Ученики", url: "/admin/learners" }
];

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pathname: "" };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.setState({ pathname: this.props.location.pathname });
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.pathname !== nextProps.location.pathname) {
      this.setState({ pathname: nextProps.location.pathname });
    }
  }
  logout() {
    logoutAdmin().then(res => {
      if (res.status === 200) {
        if (res.data.ok) {
          window.location.replace(config.API_PREFIX);
        } else {
          this.props.addError(res.data.err);
        }
      } else {
        this.props.addError("Ошибка на сервере, попробуйте позже!");
      }
    });
  }
  render() {
    const { pathname } = this.state;
    return (
      <header className="header-admin">
        <div className="header-admin__container">
          <Link to="/admin/" className="logo">
            Logo
          </Link>
          <div className="menu">
            {menu.map(item => (
              <Link
                className={item.url === pathname ? "item active" : "item"}
                to={item.url}
                key={item.url}
              >
                {item.name}
              </Link>
            ))}
            <span onClick={this.logout} className="logout">
              Выйти
            </span>
          </div>
        </div>
      </header>
    );
  }
}
