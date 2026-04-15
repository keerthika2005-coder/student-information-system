const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/students', async (req, res) => {
  try {
    console.log('Student model:', Student);

    const students = await Student.find();
    console.log('Fetched students:', students);

    res.json(students);
  } catch (err) {
    console.log('ERROR:', err);
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;