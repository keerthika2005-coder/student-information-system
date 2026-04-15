import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

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
    } catch {
      alert("❌ Student not found");
      setStudent(null);
    }
  };

  return (
    <div className="container">
      <h1>🎓 Student Dashboard</h1>

      <div className="card">
        <input
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />

        <button onClick={fetchStudent}>View Result</button>
      </div>

      {student && (
        <div className="resultCard">
          <h2>{student.name}</h2>

          <p><b>Roll No:</b> {student.rollNumber}</p>
          <p><b>Department:</b> {student.department}</p>
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