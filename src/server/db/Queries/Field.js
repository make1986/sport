import mongoose from "mongoose";

import "../Models/User/Field";

const Field = mongoose.model("Field");

module.exports.AddField = (req, res) => {
  let { name, type, options, required, quest, own } = req.body;

  let newField = new Field({ name, type, options, required, quest, own });

  return newField.save({}, (err, docs) => {
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

module.exports.GetFields = (req, res) => {
  return Field.find({})
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

module.exports.DelField = (req, res) => {
  let { id } = req.params;

  return Field.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      res.json({
        ok: false,
        err: "Ошибка сервера, попробуйте позже!"
      });
    }
    res.json({ ok: true });
  });
};

module.exports.GetFieldById = (req, res) => {
  let { id } = req.params;

  return Field.findById(id, (err, doc) => {
    if (err) {
      res.json({
        ok: false,
        err: "Ошибка сервера, попробуйте позже!"
      });
    }
    res.json({ ok: true, data: doc });
  });
};
