import React, { useState } from "react";
import axios from "axios";

const API = "https://student-information-system-f2js.onrender.com";

export default function StaffDashboard() {
  const [form, setForm] = useState({
    rollNumber: "",
    attendance: "",
    assignmentMarks: "",
    internalMarks: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveMarks = async () => {
    try {
      await axios.put(`${API}/api/staff/update/${form.rollNumber}`, {
        attendance: form.attendance,
        assignmentMarks: form.assignmentMarks,
        internalMarks: form.internalMarks
      });

      alert("Updated");
    } catch (err) {
      console.log(err);
      alert("API Error");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Staff Dashboard</h1>

      <input name="rollNumber" placeholder="Roll" onChange={handleChange} />
      <input name="attendance" placeholder="Attendance" onChange={handleChange} />
      <input name="assignmentMarks" placeholder="Assignment" onChange={handleChange} />
      <input name="internalMarks" placeholder="Internal" onChange={handleChange} />

      <button onClick={saveMarks}>Save</button>
    </div>
  );
}