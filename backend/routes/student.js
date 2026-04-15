const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ GET STUDENT RESULT BY ROLL NUMBER
router.get("/:rollNumber", async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNumber: req.params.rollNumber
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;