const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Student = require('../models/Student');

router.use(auth);

router.get('/dashboard', async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.userId });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    res.json({ student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
