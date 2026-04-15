import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function StaffDashboard() {
  const [rollNumber, setRollNumber] = useState("");
  const [attendance, setAttendance] = useState("");
  const [assignmentMarks, setAssignmentMarks] = useState("");
  const [internalMarks, setInternalMarks] = useState("");

  const saveMarks = async () => {
    try {
      await axios.put(`${API}/api/staff/update/${rollNumber}`, {
        attendance,
        assignmentMarks,
        internalMarks
      });

      alert("✅ Marks Updated Successfully");

      // clear form
      setRollNumber("");
      setAttendance("");
      setAssignmentMarks("");
      setInternalMarks("");
    } catch (err) {
      alert("❌ Update Failed");
    }
  };

  return (
    <div style={styles.container}>
      <h1>👨‍🏫 Staff Dashboard</h1>

      <div style={styles.card}>
        <h2>Enter Student Marks</h2>

        <input
          style={styles.input}
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />

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

        <button style={styles.button} onClick={saveMarks}>
          Save Marks
        </button>
      </div>
    </div>
  );
}

/* INTERNAL CSS */
const styles = {
  container: {
    width: "80%",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial"
  },

  card: {
    background: "#fff",
    padding: "25px",
    marginTop: "30px",
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "12px",
    boxShadow: "0 2px 10px #ccc"
  },

  input: {
    width: "80%",
    padding: "12px",
    margin: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  button: {
    padding: "12px 25px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};