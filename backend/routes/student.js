const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  department: String,
  subject: String,
  attendance: String,
  assignmentMarks: String,
  internalMarks: String,
  total: Number,
  grade: String
});

module.exports =
  mongoose.models.Student ||
  mongoose.model('Student', studentSchema);