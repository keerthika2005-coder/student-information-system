const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ GET ALL STUDENTS (FAST + SAFE)
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}).lean(); // ✅ IMPORTANT FIX
    res.status(200).json(students);
  } catch (err) {
    console.log("GET students error:", err);
    res.status(500).json({ error: "Failed to load students" });
  }
});

// ✅ UPDATE MARKS BY ROLL NUMBER
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

    const updatedStudent = await Student.findOneAndUpdate(
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

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (err) {
    console.log("UPDATE error:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;