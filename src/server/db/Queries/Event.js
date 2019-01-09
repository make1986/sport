import mongoose from "mongoose";

import "../Models/Event";

const Event = mongoose.model("Event");

module.exports.AddEvent = (req, res) => {
  let { body, title, lider, genImg, sport, questionnaire } = req.body;

  let newEvent = new Event({
    body,
    title,
    lider,
    genImg,
    sport,
    questionnaire
  });

  return newEvent.save({}, (err, docs) => {
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

module.exports.EditEvent = (req, res) => {
  let { body, title, lider, genImg, id } = req.body;

  return Event.findByIdAndUpdate(
    id,
    {
      $set: {
        body,
        title,
        lider,
        genImg
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

module.exports.GetEvents = (req, res) => {
  let { page, search } = req.params;
  let limit = 9;
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

  return Event.find(reqparams)
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
      Event.count(reqparams, (err, count) => {
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
module.exports.GetEventsById = (req, res) => {
  let { id } = req.params;

  return Event.findById(id, (err, doc) => {
    if (err) {
      res.json({
        ok: false,
        err: "Ошибка сервера, попробуйте позже!"
      });
    }
    res.json({ ok: true, data: doc });
  });
};

module.exports.DeleteEvent = (req, res) => {
  let { id } = req.params;

  return Event.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      res.json({
        ok: false,
        err: "Ошибка сервера, попробуйте позже!"
      });
    }
    res.json({ ok: true, data: doc._id });
  });
};
