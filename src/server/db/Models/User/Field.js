const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FieldSchema = new Schema(
  {
    name: {
      type: String
    },
    quest: {
      type: String
    },
    type: {
      type: String
    },
    options: {
      type: Array
    },
    own: {
      type: Boolean
    },
    required: {
      type: Boolean
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

const Field = mongoose.model("Field", FieldSchema);
