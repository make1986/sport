import React from "react";

import config from "../../../../../../../server/etc/config";

import Gallery from "./Gallery";

export default function Body({ data, openForm, delData, upDown }) {
  return (
    <section className="body-section">
      {data.map((d, idx) => (
        <div key={idx} className="body-section__section">
          {d.type === "h2" ? (
            <div className="wrap">
              <h2 className="h2">{d.body}</h2>
              <div className="menu">
                <span
                  onClick={() => openForm({ edit: true, idx })}
                  className="edit"
                >
                  Изменить
                </span>
                <span onClick={() => delData(idx)} className="del">
                  Удалить
                </span>
                <span onClick={() => upDown(idx, "up")} className="up">
                  Выше
                </span>
                <span onClick={() => upDown(idx, "down")} className="down">
                  Ниже
                </span>
              </div>
            </div>
          ) : d.type === "paragraph" ? (
            <div className="wrap">
              <p className="paragraph">{d.body}</p>
              <div className="menu">
                <span
                  onClick={() => openForm({ edit: true, idx })}
                  className="edit"
                >
                  Изменить
                </span>
                <span onClick={() => delData(idx)} className="del">
                  Удалить
                </span>
                <span onClick={() => upDown(idx, "up")} className="up">
                  Выше
                </span>
                <span onClick={() => upDown(idx, "down")} className="down">
                  Ниже
                </span>
              </div>
            </div>
          ) : d.type === "img" ? (
            <div className="wrap">
              <div className="img">
                <img
                  src={`${config.API_PREFIX}/Uploads/Images/${d.body.file}`}
                  alt="Не удалось загрузить изображение"
                />
                <span>{d.body.description}</span>
              </div>
              <div className="menu">
                <span
                  onClick={() => openForm({ edit: true, idx })}
                  className="edit"
                >
                  Изменить
                </span>
                <span onClick={() => delData(idx)} className="del">
                  Удалить
                </span>
                <span onClick={() => upDown(idx, "up")} className="up">
                  Выше
                </span>
                <span onClick={() => upDown(idx, "down")} className="down">
                  Ниже
                </span>
              </div>
            </div>
          ) : d.type === "gallery" ? (
            <div className="wrap">
              <Gallery data={d.body} />
              <div className="menu">
                <span
                  onClick={() => openForm({ edit: true, idx })}
                  className="edit"
                >
                  Изменить
                </span>
                <span onClick={() => delData(idx)} className="del">
                  Удалить
                </span>
                <span onClick={() => upDown(idx, "up")} className="up">
                  Выше
                </span>
                <span onClick={() => upDown(idx, "down")} className="down">
                  Ниже
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </section>
  );
}
