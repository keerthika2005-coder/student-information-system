const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ UPDATE MARKS ONLY (SIMPLE FLOW)
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
      {
        attendance,
        assignmentMarks,
        internalMarks,
        total,
        grade
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;