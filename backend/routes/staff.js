const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

router.use(auth);

router.use((req, res, next) => {
  if (req.user.role !== 'staff' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Staff access required' });
  }
  next();
});

router.get('/dashboard/stats', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    res.json({ totalStudents, totalCourses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
