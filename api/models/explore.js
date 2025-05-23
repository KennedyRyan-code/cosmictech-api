const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const joinUsSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JoinUs = mongoose.model("JoinUs", joinUsSchema);
module.exports = JoinUs;
