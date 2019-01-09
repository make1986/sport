import express from "express";

import {
  GetFields,
  AddField,
  DelField,
  GetFieldById
} from "../db/Queries/Field";

const router = express.Router();

router.post("/add", (req, res) => {
  AddField(req, res);
});

router.get("/get", (req, res) => {
  GetFields(req, res);
});

router.get("/delete/:id", (req, res) => {
  DelField(req, res);
});

router.get("/getbyid/:id", (req, res) => {
  GetFieldById(req, res);
});

module.exports = router;
