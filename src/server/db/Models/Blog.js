const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: {
      type: String
    },
    lider: {
      type: String
    },
    genImg: {
      type: String
    },
    body: {
      type: Array //image(image, desc), gallery, titles, paragraph
    },
    opened: {
      type: Number
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

const Blog = mongoose.model("Blog", BlogSchema);
