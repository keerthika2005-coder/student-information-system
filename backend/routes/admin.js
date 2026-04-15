const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    console.log('Students:', students);

    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;