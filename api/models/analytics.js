import mongoose from "mongoose";

const clickAnalyticsSchema = new mongoose.Schema({
  shortUrlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "URL",
    required: true,
  },
  clickedAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: String,
  location: {
    country: String,
    city: String,
  },
  userAgent: String,
  referrer: String,
});

const clickAnalytics = mongoose.model("ClickAnalytics", clickAnalyticsSchema);

export {clickAnalytics};