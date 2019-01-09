import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import async from "async";

import "../Models/Sport";

const Sport = mongoose.model("Sport");

module.exports.AddSport = (req, res) => {
  let { img, name, video, desc } = req.body;

  let newSport = new Sport({ img, name, video, desc });

  return newSport.save({}, (err, docs) => {
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

module.exports.EditSport = (req, res) => {
  let { img, name, video, desc, id } = req.body;

  return Sport.findByIdAndUpdate(
    id,
    {
      $set: {
        img,
        name,
        video,
        desc
      }
    },
    (err, docs) => {
      if (err) {
        res.json({
          ok: false,
          err: "Ошибка на сервере, попробуйте позже!"
        });
      }
      res.json({
        ok: true,
        err: ""
      });
    }
  );
};

module.exports.GetSports = (req, res) => {
  return Sport.find()
    .sort({ created_at: -1 })
    .exec(function(err, docs) {
      if (err) {
        res.json({
          ok: false,
          err: "Ошибка сервера, попробуйте позже!"
        });
      }
      res.json({ ok: true, data: docs });
    });
};

module.exports.GetSportById = (req, res) => {
  let { id } = req.params;

  return Sport.findById(id, (err, doc) => {
    if (err) {
      res.json({
        ok: false,
        err: "Ошибка сервера, попробуйте позже!"
      });
    }
    res.json({ ok: true, data: doc });
  });
};

module.exports.DelSports = (req, res) => {
  let { id } = req.params;

  return Sport.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      res.json({
        ok: false,
        err: "Ошибка сервера, попробуйте позже!"
      });
    }
    res.json({ ok: true });
  });
};
