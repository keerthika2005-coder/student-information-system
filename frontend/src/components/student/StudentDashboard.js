import React, { useState } from "react";
import axios from "axios";

const API = "https://student-information-system-f2js.onrender.com";

export default function StudentDashboard() {
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(
        `${API}/api/student/${rollNumber.trim()}`
      );

      setStudent(res.data);
    } catch (err) {
      alert("❌ Student not found");
      setStudent(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1>🎓 Student Dashboard</h1>

      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />

        <button style={styles.button} onClick={fetchStudent}>
          View Result
        </button>
      </div>

      {student && (
        <div style={styles.card}>
          <h2>📘 Student Result</h2>

          <p><b>Name:</b> {student.name}</p>
          <p><b>Roll No:</b> {student.rollNumber}</p>
          <p><b>Department:</b> {student.department}</p>
          <p><b>Subject:</b> {student.subject}</p>

          <hr />

          <p><b>Attendance:</b> {student.attendance || 0}</p>
          <p><b>Assignment:</b> {student.assignmentMarks || 0}</p>
          <p><b>Internal:</b> {student.internalMarks || 0}</p>

          <hr />

          <h3>Total: {student.total || 0}</h3>
          <h3>Grade: {student.grade || "N/A"}</h3>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial"
  },

  card: {
    width: "350px",
    margin: "20px auto",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 10px #ccc"
  },

  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "10px"
  },

  button: {
    padding: "10px 20px",
    background: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "8px"
  }
};