const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.put('/update/:rollNumber', async (req, res) => {
  const { internal, assignment, attendance } =
    req.body;

  const total =
    Number(internal) + Number(assignment);

  let grade = '';

  if (total >= 90) grade = 'A+';
  else if (total >= 80) grade = 'A';
  else if (total >= 70) grade = 'B+';
  else if (total >= 60) grade = 'B';
  else if (total >= 50) grade = 'C';
  else grade = 'RA';

  const result =
    grade === 'RA' ? 'Fail' : 'Pass';

  const student =
    await Student.findOneAndUpdate(
      { rollNumber: req.params.rollNumber },
      {
        internal,
        assignment,
        attendance,
        grade,
        result
      },
      { new: true }
    );

  res.json(student);
});

module.exports = router;