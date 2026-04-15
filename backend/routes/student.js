const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  department: String,
  subject: String
});

// IMPORTANT: force collection name = students
module.exports =
  mongoose.models.Student ||
  mongoose.model('Student', studentSchema, 'students');