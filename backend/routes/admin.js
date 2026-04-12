const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Student = require('../models/Student');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

router.use(auth);

router.use((req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
});

router.get('/dashboard/stats', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalStaff = await User.countDocuments({ role: 'staff' });
    const totalCourses = await Course.countDocuments();
    res.json({ totalStudents, totalStaff, totalCourses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/students', async (req, res) => {
  try {
    const students = await Student.find().populate('userId', 'username email');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/students', async (req, res) => {
  try {
    const { username, password, email, fullName, rollNumber, department, semester, batch, gender, dateOfBirth, phone } = req.body;
    
    const user = new User({ username, password, email, fullName, role: 'student', phone });
    await user.save();
    
    const student = new Student({ userId: user._id, rollNumber, name: fullName, email, phone, department, semester, batch, gender, dateOfBirth });
    await student.save();
    
    res.status(201).json({ message: 'Student created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    await User.findByIdAndDelete(student.userId);
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/staff', async (req, res) => {
  try {
    const staff = await User.find({ role: 'staff' }).select('-password');
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/staff', async (req, res) => {
  try {
    const { username, password, email, fullName, phone } = req.body;
    const user = new User({ username, password, email, fullName, role: 'staff', phone });
    await user.save();
    res.status(201).json({ message: 'Staff created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/staff/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Staff deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ message: 'Course created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
