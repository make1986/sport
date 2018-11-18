const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LearnerSchema = new Schema(
  {
    declarant: {
      type: String
    },
    name: {
      type: String
    },
    dateOfBirth: {
      type: String
    },
    address: {
      type: String
    },
    phone: {
      type: String
    },
    school: {
      type: String
    },
    mother: {
      type: Map
    },
    father: {
      type: Map
    },
    sport: {
      type: Schema.Types.ObjectId,
      ref: "Sport"
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

const Learner = mongoose.model("Learner", LearnerSchema);
