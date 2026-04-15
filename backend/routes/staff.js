const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// UPDATE marks by roll number
router.put('/update-marks/:rollNumber', async (req, res) => {
  try {
    const { subject, attendance, assignmentMarks, internalMarks } = req.body;

    const total = Number(assignmentMarks) + Number(internalMarks);

    let grade = '';
    if (total >= 90) grade = 'A+';
    else if (total >= 80) grade = 'A';
    else if (total >= 70) grade = 'B+';
    else if (total >= 60) grade = 'B';
    else if (total >= 50) grade = 'C';
    else grade = 'F';

    const student = await Student.findOneAndUpdate(
      { rollNumber: req.params.rollNumber },
      {
        subject,
        attendance,
        assignmentMarks,
        internalMarks,
        total,
        grade
      },
      { new: true }
    );

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;