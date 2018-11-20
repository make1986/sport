import React from "react";

import config from "../../../../../../server/etc/config";

import TopSection from "./Components/TopSection";
import Body from "./Components/Body";

export default function Preview({
  data,
  title,
  lider,
  genImg,
  openForm,
  delData,
  upDown,
  createdAt
}) {
  return (
    <div className="add-news__preview">
      <TopSection title={title} genImg={genImg} createdAt={createdAt} />
      <p className="lider">
        {lider
          ? lider
          : "Здесь должен располагаться Лидер абзац! Намите в меню кнопку <Лидер абзац> для его редактирования. Этот пункт является обязательным!"}
      </p>
      <div className="shared">
        <img src={`${config.API_PREFIX}/Static/Images/shared.png`} />
      </div>
      {data ? (
        <Body
          data={data}
          openForm={openForm}
          delData={delData}
          upDown={upDown}
        />
      ) : (
        ""
      )}
    </div>
  );
}
