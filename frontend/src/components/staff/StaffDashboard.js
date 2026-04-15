import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function StaffDashboard() {
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);

  const [rollNumber, setRollNumber] = useState("");
  const [attendance, setAttendance] = useState("");
  const [assignmentMarks, setAssignmentMarks] = useState("");
  const [internalMarks, setInternalMarks] = useState("");

  // ✅ LOAD STUDENTS BY SUBJECT
  const loadStudents = async () => {
    try {
      const res = await axios.get(
        `${API}/api/staff/students/${subject}`
      );

      setStudents(res.data);
    } catch (err) {
      console.log(err);
      alert("❌ Failed to load students");
    }
  };

  // ✅ UPDATE MARKS BY ROLL NUMBER
  const updateMarks = async () => {
    try {
      await axios.put(
        `${API}/api/staff/update/${rollNumber}`,
        {
          attendance,
          assignmentMarks,
          internalMarks
        }
      );

      alert("✅ Marks Updated Successfully");

      // clear inputs
      setRollNumber("");
      setAttendance("");
      setAssignmentMarks("");
      setInternalMarks("");
    } catch (err) {
      console.log(err);
      alert("❌ Update failed");
    }
  };

  return (
    <div style={styles.container}>
      <h1>👨‍🏫 Staff Dashboard</h1>

      {/* SUBJECT INPUT */}
      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Enter Subject (Maths, CS...)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <button style={styles.button} onClick={loadStudents}>
          Load Students
        </button>
      </div>

      {/* STUDENT LIST */}
      <div style={styles.grid}>
        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          students.map((s) => (
            <div key={s._id} style={styles.studentCard}>
              <p><b>Name:</b> {s.name}</p>
              <p><b>Roll:</b> {s.rollNumber}</p>
              <p><b>Subject:</b> {s.subject}</p>
            </div>
          ))
        )}
      </div>

      {/* UPDATE MARKS */}
      <div style={styles.card}>
        <h3>Update Marks</h3>

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

        <button style={styles.button} onClick={updateMarks}>
          Save Marks
        </button>
      </div>
    </div>
  );
}

/* ================= CSS ================= */
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
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  studentCard: {
    background: "#fff",
    margin: "10px",
    padding: "15px",
    width: "200px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px #ccc"
  }
};