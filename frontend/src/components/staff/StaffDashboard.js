import React, { useState } from "react";
import axios from "axios";

const API = "https://student-information-system-f2js.onrender.com";

export default function StaffDashboard() {
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);

  const [attendance, setAttendance] = useState("");
  const [assignmentMarks, setAssignmentMarks] = useState("");
  const [internalMarks, setInternalMarks] = useState("");

  // 🔍 LOAD STUDENT BY ROLL
  const loadStudent = async () => {
    try {
      const res = await axios.get(`${API}/api/student/${rollNumber}`);
      setStudent(res.data);
    } catch {
      alert("❌ Student not found");
      setStudent(null);
    }
  };

  // ✏ UPDATE MARKS
  const updateMarks = async () => {
    try {
      await axios.put(`${API}/api/staff/update/${rollNumber}`, {
        attendance,
        assignmentMarks,
        internalMarks
      });

      alert("✅ Updated Successfully");
      loadStudent(); // refresh student data
    } catch {
      alert("❌ Update Failed");
    }
  };

  return (
    <div style={styles.page}>
      <h1>👨‍🏫 Staff Dashboard</h1>

      {/* SEARCH BOX */}
      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />

        <button style={styles.button} onClick={loadStudent}>
          Load Student
        </button>
      </div>

      {/* STUDENT DATA */}
      {student && (
        <div style={styles.card}>
          <h2>📘 Student Details</h2>

          <p><b>Name:</b> {student.name}</p>
          <p><b>Roll:</b> {student.rollNumber}</p>
          <p><b>Department:</b> {student.department}</p>
          <p><b>Subject:</b> {student.subject}</p>

          <hr />

          <p><b>Attendance:</b> {student.attendance}</p>
          <p><b>Assignment:</b> {student.assignmentMarks}</p>
          <p><b>Internal:</b> {student.internalMarks}</p>

          <h3>Total: {student.total}</h3>
          <h3>Grade: {student.grade}</h3>
        </div>
      )}

      {/* UPDATE FORM */}
      <div style={styles.card}>
        <h2>✏ Update Marks</h2>

        <input
          style={styles.input}
          placeholder="Attendance"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Assignment Marks"
          value={assignmentMarks}
          onChange={(e) => setAssignmentMarks(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Internal Marks"
          value={internalMarks}
          onChange={(e) => setInternalMarks(e.target.value)}
        />

        <button style={styles.button} onClick={updateMarks}>
          Save Update
        </button>
      </div>
    </div>
  );
}

/* 🎨 INTERNAL CSS (CENTERED + CLEAN UI) */
const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f4f6f8",
    fontFamily: "Arial"
  },

  card: {
    width: "380px",
    background: "white",
    padding: "20px",
    margin: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    textAlign: "center"
  },

  input: {
    width: "90%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  button: {
    width: "95%",
    padding: "12px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px"
  }
};