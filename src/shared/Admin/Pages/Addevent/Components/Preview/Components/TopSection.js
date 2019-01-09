import React from "react";

import config from "../../../../../../../server/etc/config";
import { DateAndTime } from "../../../../../../helpers/datetime";

export default function TopSection({ title, genImg, createdAt }) {
  return (
    <section
      style={
        genImg
          ? {
              background: `url(${config.API_PREFIX}/Uploads/Images/${genImg})`
            }
          : {}
      }
      className="top-section"
    >
      <div className="top-section__info">
        <div className="info">
          <span>Новость</span>
          <span>{DateAndTime(createdAt).date}</span>
          <span>в {DateAndTime(createdAt).time}</span>
        </div>
        <h1>{title ? title : "Главный заголовок"}</h1>
      </div>
    </section>
  );
}
