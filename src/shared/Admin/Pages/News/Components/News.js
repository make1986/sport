import React from "react";
import { Link } from "react-router-dom";

import config from "../../../../../server/etc/config";
import { DateAndTime } from "../../../../helpers/datetime";

export default function AllNews({ data }) {
  return (
    <section className="news__allnews">
      {data && data.data && data.data.length > 0 ? (
        <div className="data">
          {data.data.map(item => (
            <div className="item" key={item._id}>
              <div
                className="img"
                style={{
                  background: `url(${config.API_PREFIX}/Uploads/Images/${
                    item.genImg
                  })`
                }}
              />
              <div className="info">
                <div className="menu">
                  <span className="delete">Удалить</span>
                  <Link className="edit" to={`/admin/editnews/${item._id}`}>
                    Изменить
                  </Link>
                </div>
                <h3>{item.title}</h3>
                <span className="date">
                  {DateAndTime(item.created_at).dateWithoutYear}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
