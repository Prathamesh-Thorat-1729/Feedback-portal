const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  feedbackText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  responseText: { type: String },
});

module.exports = { Feedback: mongoose.model("Feedbacks", feedbackSchema) };
