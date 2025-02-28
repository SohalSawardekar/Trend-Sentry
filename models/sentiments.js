import mongoose from "mongoose";

const sentimentSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    enum: ["positive", "neutral", "negative"],
  },
  count: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  time: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Sentiment =
  mongoose.models.Sentiment || mongoose.model("Sentiment", sentimentSchema);

export default Sentiment;
