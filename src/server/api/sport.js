import express from "express";

import {
  AddSport,
  GetSports,
  DelSports,
  GetSportById,
  EditSport
} from "../db/Queries/Sport";

const router = express.Router();

router.post("/add", (req, res) => {
  AddSport(req, res);
});

router.post("/edit", (req, res) => {
  EditSport(req, res);
});

router.get("/get", (req, res) => {
  GetSports(req, res);
});

router.get("/delete/:id", (req, res) => {
  DelSports(req, res);
});

router.get("/getbyid/:id", (req, res) => {
  GetSportById(req, res);
});

module.exports = router;
