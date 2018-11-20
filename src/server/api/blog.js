import express from "express";

import { AddBlog, GetBlogs, GetBlogsById, EditBlog } from "../db/Queries/Blog";

const router = express.Router();

router.post("/add", (req, res) => {
  AddBlog(req, res);
});

router.post("/edit", (req, res) => {
  EditBlog(req, res);
});

router.get("/get/:page/:search", (req, res) => {
  GetBlogs(req, res);
});

router.get("/getbyid/:id", (req, res) => {
  GetBlogsById(req, res);
});

module.exports = router;
