const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    data: {
      type: Array
    },
    img: {
      type: String
    },
    start: {
      type: String
    },
    sport: {
      type: Schema.Types.ObjectId,
      ref: "Sport"
    },
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
    ]
  },
  { timestamps: { createdAt: "created_at" } }
);

const Event = mongoose.model("Event", EventSchema);
