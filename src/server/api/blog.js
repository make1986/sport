import express from "express";

import {
  AddBlog,
  GetBlogs,
  GetBlogsById,
  EditBlog,
  DeleteBlog
} from "../db/Queries/Blog";

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

router.get("/delete/:id", (req, res) => {
  DeleteBlog(req, res);
});

module.exports = router;
