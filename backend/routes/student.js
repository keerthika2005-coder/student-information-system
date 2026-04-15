const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String
  },
  subject: {
    type: String
  },
  attendance: {
    type: String,
    default: ''
  },
  assignmentMarks: {
    type: String,
    default: ''
  },
  internalMarks: {
    type: String,
    default: ''
  },
  total: {
    type: Number,
    default: 0
  },
  grade: {
    type: String,
    default: ''
  }
});

const Student =
  mongoose.models.Student ||
  mongoose.model('Student', studentSchema);

module.exports = Student;