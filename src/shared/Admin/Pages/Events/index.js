import React from "react";

import AddButton from "../../Components/Add";

export default class EventsPage extends React.Component {
  render() {
    return (
      <div className="page__container events">
        <h3>Events</h3>
        <AddButton link="/admin/addevent" />
      </div>
    );
  }
}
