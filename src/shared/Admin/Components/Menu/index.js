import React from "react";

export default function Menu({ openForm, saveForm, menu }) {
  return (
    <div className="menu-add">
      {menu.map(item => (
        <div
          key={item.slug}
          onClick={() => openForm(item.slug)}
          className={item.required ? "item required" : "item"}
        >
          {item.name}
        </div>
      ))}
      <div onClick={saveForm} className="item save">
        Сохранить
      </div>
    </div>
  );
}
