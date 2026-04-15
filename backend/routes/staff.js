const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ GET ALL STUDENTS (NO FILTER)
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find({});
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