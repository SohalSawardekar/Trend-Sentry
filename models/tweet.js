import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true,
  },
  clean_comment: {
    type: String,
    required: true,
  },
});

const Tweets = mongoose.model("tweets", tweetSchema);

export default Tweets;
