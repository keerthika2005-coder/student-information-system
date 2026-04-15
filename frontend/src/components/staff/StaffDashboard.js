import React, { useState } from 'react';
import axios from 'axios';

export default function StaffDashboard() {
  const [rollNumber, setRollNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [attendance, setAttendance] = useState('');
  const [assignmentMarks, setAssignmentMarks] = useState('');
  const [internalMarks, setInternalMarks] = useState('');

  const saveData = async () => {
    try {
      await axios.put(
        `https://student-information-system-f2js.onrender.com/api/staff/update-marks/${rollNumber}`,
        {
          subject,
          attendance,
          assignmentMarks,
          internalMarks
        }
      );

      alert('✅ Data Saved Successfully');

      setRollNumber('');
      setSubject('');
      setAttendance('');
      setAssignmentMarks('');
      setInternalMarks('');
    } catch (err) {
      alert('❌ Error saving data');
    }
  };

  return (
    <div style={container}>
      <h1>👩‍🏫 Staff Dashboard</h1>

      <input placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
      <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <input placeholder="Attendance %" value={attendance} onChange={(e) => setAttendance(e.target.value)} />
      <input placeholder="Assignment Marks" value={assignmentMarks} onChange={(e) => setAssignmentMarks(e.target.value)} />
      <input placeholder="Internal Marks" value={internalMarks} onChange={(e) => setInternalMarks(e.target.value)} />

      <button onClick={saveData}>💾 Save</button>
    </div>
  );
}

const container = {
  textAlign: 'center',
  padding: '30px'
};