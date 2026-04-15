const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: { type: String, unique: true },
  department: String,
  semester: String,   // ✅ NEW
  subject: String,

  attendance: Number,
  assignmentMarks: Number,
  internalMarks: Number,

  total: Number,
  grade: String
});

module.exports = mongoose.model("Student", studentSchema);