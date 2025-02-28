import mongoose from "mongoose";

const emotionSchema = new mongoose.Schema(
  {
    emotion: {
      type: String,
      enum: ["sadness", "joy", "love", "anger", "fear", "surprise"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Emotion =
  mongoose.models.Emotion || mongoose.model("Emotion", emotionSchema);

export default Emotion;
