import React from "react";

export default function Confirmed({ text, close, func, id }) {
  return (
    <div className="confirmed">
      <div className="confirmed__container">
        <p>{text}</p>
        <div className="menu">
          <span className="delete" onClick={() => func(id)}>
            Да
          </span>
          <span className="close" onClick={() => close("")}>
            Нет
          </span>
        </div>
      </div>
    </div>
  );
}
