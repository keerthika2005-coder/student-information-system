const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/:rollNumber', async (req, res) => {
  const student = await Student.findOne({
    rollNumber: req.params.rollNumber
  });

  res.json(student);
});

module.exports = router;