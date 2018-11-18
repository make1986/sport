import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import async from "async";

import "../Models/Superuser";

const Superuser = mongoose.model("Superuser");

module.exports.AddSuperuser = function(data) {
  let { lgn, psswrd } = data;

  let newSuperuser = new Superuser({
    lgn,
    psswrd
  });

  return newSuperuser.save({}, (err, docs) => {
    if (err) {
      return {
        ok: false,
        err: "Ошибка на сервере, попробуйте позже!"
      };
    } else {
      return {
        ok: true,
        err: ""
      };
    }
  });
};
module.exports.CheckSuperuser = (req, res) => {
  const lgn = req.body.login;
  const psswrd = req.body.password;
  return Superuser.findOne({ lgn }, (err, doc) => {
    if (err) {
      res.json({
        ok: false,
        err: "Ошибка на сервере, попробуйте позже!"
      });
    } else {
      if (!doc) {
        res.json({
          ok: false,
          err: "Логин или пароль указаны не верно!"
        });
      } else {
        bcrypt.compare(psswrd, doc.psswrd, (err, response) => {
          if (err) {
            res.json({
              ok: false,
              err: "Ошибка на сервере, попробуйте позже!"
            });
          } else {
            if (!response) {
              res.json({
                ok: false,
                err: "Логин или пароль указаны не верно!"
              });
            } else {
              req.session.superman = doc._id;
              res.json({
                ok: true,
                err: ""
              });
            }
          }
        });
      }
    }
  });
};
