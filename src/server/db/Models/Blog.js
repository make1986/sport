const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: {
      type: String
    },
    liderParagraph: {
      type: String
    },
    img: {
      type: Map
    },
    body: {
      type: Array //image(image, desc), gallery, titles, paragraph
    },
    opened: {
      type: Number
    },
    tags: {
      type: Array
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

const Blog = mongoose.model("Blog", BlogSchema);
