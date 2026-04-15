const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ FILTER BY department + semester
router.get("/students", async (req, res) => {
  try {
    const { department, semester } = req.query;

    const students = await Student.find({
      department,
      semester
    });

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
      Number(attendance) +
      Number(assignmentMarks) +
      Number(internalMarks);

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