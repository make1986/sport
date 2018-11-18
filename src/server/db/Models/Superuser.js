const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SuperuserSchema = new Schema(
  {
    lgn: {
      type: String,
      unique: true,
      required: true
    },
    psswrd: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

const Superuser = mongoose.model("Superuser", SuperuserSchema);
