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

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;