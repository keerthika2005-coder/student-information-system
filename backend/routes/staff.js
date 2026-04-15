const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ FILTER ONLY BY department + subject
router.get("/students", async (req, res) => {
  try {
    const { department, subject } = req.query;

    const filter = {};

    if (department) filter.department = department;
    if (subject) filter.subject = subject;

    const students = await Student.find(filter);

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE MARKS
router.put("/update/:rollNumber", async (req, res) => {
  try {
    const { attendance, assignmentMarks, internalMarks } = req.body;

    const total =
      Number(attendance || 0) +
      Number(assignmentMarks || 0) +
      Number(internalMarks || 0);

    let grade = "F";
    if (total >= 90) grade = "A";
    else if (total >= 75) grade = "B";
    else if (total >= 60) grade = "C";

    const updated = await Student.findOneAndUpdate(
      { rollNumber: req.params.rollNumber },
      { attendance, assignmentMarks, internalMarks, total, grade },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;