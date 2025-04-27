import mongoose from "mongoose";

const urlSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: null,
      index: { expires: 0 },
    },
    visitHistory: [{ timestamps: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const URL=mongoose.model("url",urlSchema);

export {URL};
