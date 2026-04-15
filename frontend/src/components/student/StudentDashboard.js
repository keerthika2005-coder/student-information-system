import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function StudentDashboard() {
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(
        `${API}/api/student/${rollNumber}`
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
        <div style={styles.resultCard}>
          <h2>{student.name}</h2>

          <p><b>Roll:</b> {student.rollNumber}</p>
          <p><b>Department:</b> {student.department}</p>
          <p><b>Semester:</b> {student.semester}</p>
          <p><b>Subject:</b> {student.subject}</p>

          <hr />

          <p>Attendance: {student.attendance}</p>
          <p>Assignment: {student.assignmentMarks}</p>
          <p>Internal: {student.internalMarks}</p>

          <hr />

          <h3>Total: {student.total}</h3>
          <h3>Grade: {student.grade}</h3>
        </div>
      )}
    </div>
  );
}

/* CSS */
const styles = {
  container: {
    width: "80%",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial"
  },

  card: {
    background: "#fff",
    padding: "20px",
    margin: "20px auto",
    width: "60%",
    borderRadius: "10px",
    boxShadow: "0 2px 10px #ccc"
  },

  input: {
    width: "70%",
    padding: "10px",
    margin: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  button: {
    padding: "10px 20px",
    background: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "8px"
  },

  resultCard: {
    background: "#fff",
    padding: "25px",
    width: "60%",
    margin: "20px auto",
    borderRadius: "12px",
    boxShadow: "0 2px 10px #aaa",
    textAlign: "left"
  }
};