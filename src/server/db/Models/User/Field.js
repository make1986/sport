const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FieldSchema = new Schema(
  {
    name: {
      type: String
    },
    type: {
      type: String
    },
    setting: {
      type: Map
    },
    required: {
      type: Boolean
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

const Field = mongoose.model("Field", FieldSchema);
