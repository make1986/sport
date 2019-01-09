const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
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
    start: {
      type: String
    },
    end: {
      type: String
    },
    sport: [
      {
        type: Schema.Types.ObjectId,
        ref: "Sport"
      }
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    questionnaire: [
      {
        type: Schema.Types.ObjectId,
        ref: "Field"
      }
    ],
    opened: {
      type: Number
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

const Event = mongoose.model("Event", EventSchema);
