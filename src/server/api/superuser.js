import express from "express";
import bcrypt from "bcrypt-nodejs";

import { AddSuperuser, CheckSuperuser } from "../db/Queries/Superuser";

const router = express.Router();

router.post("/add", (req, res) => {
  bcrypt.hash("sport_ru-tuapse-14-00Goddag", null, null, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      console.log(hash);
      AddSuperuser({ lgn: "helloadmin", psswrd: hash });
    }
  });
});

router.post("/checkadmin", (req, res) => {
  CheckSuperuser(req, res);
});

router.get("/checkauth", (req, res) => {
  if (req.session.superman) {
    res.json({ auth: true });
  } else {
    res.json({ auth: false });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
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
});

module.exports = router;
