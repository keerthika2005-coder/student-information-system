const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  credits: { type: Number, required: true },
  instructor: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  maxSeats: { type: Number, default: 60 },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Course', courseSchema);
