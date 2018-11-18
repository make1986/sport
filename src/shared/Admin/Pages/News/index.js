import React from "react";

import AddButton from "../../Components/Add";

export default class NewsPage extends React.Component {
  render() {
    return (
      <div className="page__container news">
        <h3>News</h3>
        <AddButton link="/admin/addnews" />
      </div>
    );
  }
}
