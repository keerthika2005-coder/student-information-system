import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StaffDashboard() {
  const [students, setStudents] = useState([]);
  const [rollNumber, setRollNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [attendance, setAttendance] = useState('');
  const [assignmentMarks, setAssignmentMarks] = useState('');
  const [internalMarks, setInternalMarks] = useState('');

  // ✅ fetch by subject (NOT ALL STUDENTS)
  const fetchStudents = async (subj) => {
    try {
      const res = await axios.get(
        `https://student-information-system-f2js.onrender.com/api/staff/students/${subj}`
      );
      setStudents(res.data);
    } catch (error) {
      alert('Failed to fetch students');
    }
  };

  const saveMarks = async () => {
    try {
      await axios.put(
        `https://student-information-system-f2js.onrender.com/api/staff/update/${rollNumber}`,
        {
          attendance,
          assignmentMarks,
          internalMarks
        }
      );

      alert('✅ Marks Updated');

      setRollNumber('');
      setAttendance('');
      setAssignmentMarks('');
      setInternalMarks('');
    } catch (error) {
      alert('❌ Save failed');
    }
  };

  return (
    <div style={{ width: '80%', margin: '30px auto', textAlign: 'center' }}>
      <h1>👩‍🏫 Staff Dashboard</h1>

      {/* SUBJECT SEARCH */}
      <div style={{ padding: 20 }}>
        <input
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <button onClick={() => fetchStudents(subject)}>
          Load Students
        </button>
      </div>

      {/* UPDATE MARKS */}
      <div>
        <input
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <input
          placeholder="Attendance"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        />
        <input
          placeholder="Assignment"
          value={assignmentMarks}
          onChange={(e) => setAssignmentMarks(e.target.value)}
        />
        <input
          placeholder="Internal"
          value={internalMarks}
          onChange={(e) => setInternalMarks(e.target.value)}
        />

        <button onClick={saveMarks}>Save Marks</button>
      </div>

      {/* STUDENT LIST */}
      <h2>Students</h2>
      {students.map((s) => (
        <div key={s._id}>
          <p>{s.name} - {s.rollNumber}</p>
        </div>
      ))}
    </div>
  );
}