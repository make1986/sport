import express from "express";

import { AddBlog } from "../db/Queries/Blog";

const router = express.Router();

router.post("/add", (req, res) => {
  AddBlog(req, res);
});

module.exports = router;
