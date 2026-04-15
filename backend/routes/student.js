const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ GET STUDENT BY ROLL NUMBER (FIXED)
router.get("/:rollNumber", async (req, res) => {
  try {
    const rollNumber = req.params.rollNumber.trim();

    const student = await Student.findOne({
      rollNumber: rollNumber
    }).lean();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;