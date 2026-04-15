import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function StaffDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [rollNumber, setRollNumber] = useState("");
  const [attendance, setAttendance] = useState("");
  const [assignmentMarks, setAssignmentMarks] = useState("");
  const [internalMarks, setInternalMarks] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true); // ✅ SHOW LOADING

      const res = await axios.get(`${API}/api/staff/students`);

      setStudents(res.data);
      setLoading(false); // ✅ STOP LOADING
    } catch (err) {
      setLoading(false);
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

      {/* LOADING FIX */}
      {loading && <p>⏳ Loading students...</p>}

      {/* STUDENT LIST */}
      <div style={styles.card}>
        <h2>Students</h2>

        {!loading && students.length === 0 && (
          <p>No students found</p>
        )}

        {students.map((s) => (
          <div key={s._id} style={styles.box}>
            <p><b>{s.name}</b></p>
            <p>{s.rollNumber}</p>
            <p>{s.subject}</p>
          </div>
        ))}
      </div>

      {/* MARK ENTRY */}
      <div style={styles.card}>
        <h2>Enter Marks</h2>

        <input placeholder="Roll Number" onChange={(e) => setRollNumber(e.target.value)} />
        <input placeholder="Attendance" onChange={(e) => setAttendance(e.target.value)} />
        <input placeholder="Assignment" onChange={(e) => setAssignmentMarks(e.target.value)} />
        <input placeholder="Internal" onChange={(e) => setInternalMarks(e.target.value)} />

        <button onClick={updateMarks}>Save</button>
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
    padding: "20px",
    margin: "20px auto",
    width: "60%",
    borderRadius: "10px",
    boxShadow: "0 2px 10px #ccc"
  },

  box: {
    padding: "10px",
    borderBottom: "1px solid #ddd"
  }
};