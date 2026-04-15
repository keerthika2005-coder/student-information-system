const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// view all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// add new student
router.post('/add-student', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    res.json({
      message: 'Student added successfully',
      student
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// update student
router.put('/update-student/:id', async (req, res) => {
  try {
    const student =
      await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(student);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// delete student
router.delete('/delete-student/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: 'Deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;