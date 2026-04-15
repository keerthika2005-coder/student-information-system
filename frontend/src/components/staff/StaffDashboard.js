import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function StaffDashboard() {
  const [students, setStudents] = useState([]);

  const [rollNumber, setRollNumber] = useState("");
  const [attendance, setAttendance] = useState("");
  const [assignmentMarks, setAssignmentMarks] = useState("");
  const [internalMarks, setInternalMarks] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await axios.get(`${API}/api/staff/students`);
      setStudents(res.data);
    } catch {
      alert("❌ Failed to load students");
    }
  };

  const updateMarks = async () => {
    try {
      await axios.put(`${API}/api/staff/update/${rollNumber}`, {
        attendance,
        assignmentMarks,
        internalMarks
      });

      alert("✅ Marks Updated");
      loadStudents();
    } catch {
      alert("❌ Update failed");
    }
  };

  return (
    <div style={styles.container}>
      <h1>👨‍🏫 Staff Dashboard</h1>

      {/* STUDENT LIST */}
      <div style={styles.card}>
        <h2>Student List</h2>

        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          students.map((s) => (
            <div key={s._id} style={styles.studentBox}>
              <p><b>{s.name}</b></p>
              <p>Roll: {s.rollNumber}</p>
              <p>Subject: {s.subject}</p>
            </div>
          ))
        )}
      </div>

      {/* MARK ENTRY */}
      <div style={styles.card}>
        <h2>Enter Marks</h2>

        <input
          style={styles.input}
          placeholder="Roll Number"
          onChange={(e) => setRollNumber(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Attendance"
          onChange={(e) => setAttendance(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Assignment Marks"
          onChange={(e) => setAssignmentMarks(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Internal Marks"
          onChange={(e) => setInternalMarks(e.target.value)}
        />

        <button style={styles.button} onClick={updateMarks}>
          Save Marks
        </button>
      </div>
    </div>
  );
}

/* ✅ INTERNAL CSS */
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

  studentBox: {
    padding: "10px",
    margin: "10px",
    borderBottom: "1px solid #ddd"
  },

  input: {
    width: "80%",
    padding: "10px",
    margin: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  button: {
    padding: "10px 20px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};