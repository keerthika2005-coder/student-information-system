const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET student by roll number
router.get('/:rollNumber', async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNumber: req.params.rollNumber
    });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;