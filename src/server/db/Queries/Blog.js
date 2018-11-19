import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import async from "async";

import "../Models/Blog";

const Blog = mongoose.model("Blog");

module.exports.AddBlog = (req, res) => {
  let { body, title, lider, genImg } = req.body;

  let newBlog = new Blog({ body, title, lider, genImg });

  return newBlog.save({}, (err, docs) => {
    if (err) {
      res.json({
        ok: false,
        err: "Ошибка на сервере, попробуйте позже!"
      });
    } else {
      res.json({
        ok: true,
        err: ""
      });
    }
  });
};
