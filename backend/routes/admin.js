const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post('/add-student', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

router.put('/update-student/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(student);
});

router.delete('/delete-student/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;