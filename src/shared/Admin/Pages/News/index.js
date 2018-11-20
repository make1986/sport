import React from "react";

import { getBlogs } from "../../api";

import AddButton from "../../Components/Add";
import AllNews from "./Components/News";

export default class NewsPage extends React.Component {
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
    this.state = {
      data: data,
      page: 1,
      search: "all"
    };

    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    let { page, search, loadDataServer } = this.state;
    if (!this.state.data) {
      this.fetchData(page, search);
    }
  }
  fetchData(page, search) {
    getBlogs(page, search).then(res => {
      if (!res.ok) {
        this.props.addError("Ошибка сервера, попробуйте позже!");
      } else {
        this.setState({
          data: res
        });
      }
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div className="page__container news">
        <h3 className="page__title">Новости</h3>
        <AllNews data={data} />
        <AddButton link="/admin/addnews" />
      </div>
    );
  }
}
