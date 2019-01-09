import React from "react";

import { getBlogs, deleteBlog } from "../../api";

import AddButton from "../../Components/Add";
import Confirmed from "../../Components/Confirmed";
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
      search: "all",
      deleteID: ""
    };

    this.fetchData = this.fetchData.bind(this);
    this.openConf = this.openConf.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
    this.load = this.load.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
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
  openConf(deleteID) {
    this.setState({ deleteID }, function() {
      if (deleteID !== "") {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    });
  }
  deleteBlog(id) {
    deleteBlog(id).then(res => {
      if (!res.ok) {
        this.props.addError("Ошибка сервера, попробуйте позже!");
      } else {
        let { data } = this.state;
        let index = data.data.findIndex(doc => doc._id === id);
        data.data.splice(index, 1);
        data.count--;
        this.setState({ data, deleteID: "" }, function() {
          document.body.style.overflowY = "auto";
        });
      }
    });
  }
  load() {
    let { data, page, search } = this.state;
    page++;
    getBlogs(page, search).then(res => {
      if (res.ok) {
        data.data = [...data.data, ...res.data];
        this.setState({ data, page });
      } else {
        this.props.addError("Ошибка сервера, попробуйте позже!");
      }
    });
  }
  render() {
    const { data, deleteID } = this.state;
    return (
      <div className="page__container news">
        <h3 className="page__title">Новости</h3>
        <AllNews load={this.load} openConf={this.openConf} data={data} />
        <AddButton link="/admin/addnews" />
        {deleteID !== "" ? (
          <Confirmed
            func={this.deleteBlog}
            id={deleteID}
            close={this.openConf}
            text="Вы действительно хотите удалить эту статью?"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
