import React from "react";
import { Link } from "react-router-dom";

import config from "../../../../../server/etc/config";

export default function AllSports({ data, openConf }) {
  return (
    <section className="sport__allsport">
      {data && data.data && data.data.length > 0 ? (
        <div className="data">
          {data.data.map(item => (
            <div className="item" key={item._id}>
              <div
                className="img"
                style={{
                  background: `url(${config.API_PREFIX}/Uploads/Images/${
                    item.img
                  })`
                }}
              />
              <div className="info">
                <div className="menu">
                  <span onClick={() => openConf(item._id)} className="delete">
                    Удалить
                  </span>
                  <Link className="edit" to={`/admin/editsport/${item._id}`}>
                    Изменить
                  </Link>
                </div>
                <h3>{item.name}</h3>
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
