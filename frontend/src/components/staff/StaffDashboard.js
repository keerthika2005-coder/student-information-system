import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const API = process.env.REACT_APP_API_URL;

export default function StaffDashboard() {
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);

  const [rollNumber, setRollNumber] = useState("");
  const [attendance, setAttendance] = useState("");
  const [assignmentMarks, setAssignmentMarks] = useState("");
  const [internalMarks, setInternalMarks] = useState("");

  const loadStudents = async () => {
    const res = await axios.get(
      `${API}/api/staff/students/${subject}`
    );
    setStudents(res.data);
  };

  const updateMarks = async () => {
    await axios.put(
      `${API}/api/staff/update/${rollNumber}`,
      { attendance, assignmentMarks, internalMarks }
    );

    alert("✅ Updated");
  };

  return (
    <div className="container">
      <h1>👨‍🏫 Staff Dashboard</h1>

      <div className="card">
        <input
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button onClick={loadStudents}>Load Students</button>
      </div>

      <div className="grid">
        {students.map((s) => (
          <div key={s._id} className="studentCard">
            <p><b>{s.name}</b></p>
            <p>{s.rollNumber}</p>
            <p>{s.subject}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Update Marks</h3>

        <input placeholder="Roll Number" onChange={(e) => setRollNumber(e.target.value)} />
        <input placeholder="Attendance" onChange={(e) => setAttendance(e.target.value)} />
        <input placeholder="Assignment" onChange={(e) => setAssignmentMarks(e.target.value)} />
        <input placeholder="Internal" onChange={(e) => setInternalMarks(e.target.value)} />

        <button onClick={updateMarks}>Save</button>
      </div>
    </div>
  );
}