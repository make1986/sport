const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SportSchema = new Schema(
  {
    name: {
      type: String
    },
    data: {
      type: Array
    },
    img: {
      type: String
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

const Sport = mongoose.model("Sport", SportSchema);
