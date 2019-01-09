import express from "express";

import {
  AddEvent,
  GetEvents,
  GetEventsById,
  EditEvent,
  DeleteEvent
} from "../db/Queries/Event";

const router = express.Router();

router.post("/add", (req, res) => {
  AddEvent(req, res);
});

router.post("/edit", (req, res) => {
  EditEvent(req, res);
});

router.get("/get/:page/:search", (req, res) => {
  GetEvents(req, res);
});

router.get("/getbyid/:id", (req, res) => {
  GetEventsById(req, res);
});

router.get("/delete/:id", (req, res) => {
  DeleteEvent(req, res);
});

module.exports = router;
