import React from "react";

const menu = [
  { slug: "h1", name: "Заголовок", required: true },
  { slug: "lider", name: "Лидер абзац", required: true },
  { slug: "gen-img", name: "Главное изображение", required: true },
  { slug: "h2", name: "Заголовок абзаца", required: false },
  { slug: "paragraph", name: "Абзац", required: false },
  { slug: "img", name: "Изображение", required: false },
  { slug: "gallery", name: "Галерея", required: false }
];

export default function Menu({ openForm, saveForm }) {
  return (
    <div className="add-news__menu">
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
