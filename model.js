const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  studentId: {
    unique: true,
    type: Number,
  },
  creator: String,
});

module.exports = mongoose.model("Student", schema);
