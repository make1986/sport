import React from "react";

import { getSports, delSport } from "../../api";

import AddButton from "../../Components/Add";
import AllSports from "./Components/Sports";
import Confirmed from "../../Components/Confirmed";

export default class SportPage extends React.Component {
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
      data: data,
      deleteId: ""
    };
    this.fetchData = this.fetchData.bind(this);
    this.openConf = this.openConf.bind(this);
    this.deleteSport = this.deleteSport.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.state.data) {
      this.fetchData();
    }
  }
  fetchData() {
    getSports().then(res => {
      if (!res.ok) {
        this.props.addError("Ошибка сервера, попробуйте позже!");
      } else {
        this.setState({
          data: res
        });
      }
    });
  }
  openConf(deleteId) {
    this.setState({ deleteId }, function() {
      if (deleteId !== "") {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    });
  }
  deleteSport() {
    delSport(this.state.deleteId).then(res => {
      if (!res.ok) {
        this.props.addError("Ошибка сервера, попробуйте позже!");
      } else {
        let { data, deleteId } = this.state;
        let index = data.data.findIndex(doc => doc._id === deleteId);
        data.data.splice(index, 1);
        data.count--;
        this.setState({ data, deleteId: "" }, function() {
          document.body.style.overflowY = "auto";
        });
      }
    });
  }
  render() {
    const { data, deleteId } = this.state;
    return (
      <div className="page__container sport">
        <h3 className="page__title">Секции</h3>
        <AllSports openConf={this.openConf} data={data} />
        <AddButton link="/admin/addsport" />
        {deleteId ? (
          <Confirmed
            func={this.deleteSport}
            id={deleteId}
            close={this.openConf}
            text="Вы действительно хотите удалить эту секцию?"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
