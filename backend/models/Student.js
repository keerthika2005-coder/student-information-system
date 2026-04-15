const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  department: String,
  subject: String,
  internal: Number,
  assignment: Number,
  attendance: Number,
  grade: String,
  result: String
});

module.exports = mongoose.model(
  'Student',
  studentSchema
);