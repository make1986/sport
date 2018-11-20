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

module.exports.GetBlogs = (req, res) => {
  let { page, search } = req.params;
  let limit = 10;
  let skip = (page - 1) * limit;
  let reqparams = {};
  search = decodeURIComponent(search);
  if (search && search !== "all") {
    reqparams = {
      $or: [
        { title: new RegExp(search, "i") },
        { lider: new RegExp(search, "i") },
        {
          body: {
            $elemMatch: {
              body: new RegExp(search, "i")
            }
          }
        }
      ]
    };
  }

  return Blog.find(reqparams)
    .limit(Number(limit))
    .skip(Number(skip))
    .sort({ created_at: -1 })
    .exec(function(err, docs) {
      if (err) {
        res.json({
          ok: false,
          err: "Ошибка сервера, попробуйте позже!"
        });
      }
      Blog.count(reqparams, (err, count) => {
        if (err) {
          res.json({
            ok: false,
            err: "Ошибка сервера, попробуйте позже!"
          });
        }
        res.json({ ok: true, data: docs, count });
      });
    });
};
module.exports.GetBlogsById = (req, res) => {
  let { id } = req.params;

  return Blog.findById(id, (err, doc) => {
    if (err) {
      res.json({
        ok: false,
        err: "Ошибка сервера, попробуйте позже!"
      });
    }
    res.json({ ok: true, data: doc });
  });
};
