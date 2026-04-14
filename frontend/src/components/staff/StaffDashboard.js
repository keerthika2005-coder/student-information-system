import React, { useState, useEffect } from 'react';

export default function StaffDashboard() {
  const [students, setStudents] = useState([]);
  const [subject, setSubject] = useState('');
  const [studentName, setStudentName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [assignmentMarks, setAssignmentMarks] = useState('');
  const [internalMarks, setInternalMarks] = useState('');

  useEffect(() => {
    const savedStudents =
      JSON.parse(localStorage.getItem('students')) || [];
    setStudents(savedStudents);
  }, []);

  const calculateGrade = (total) => {
    if (total >= 90) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 70) return 'B+';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    return 'F';
  };

  const saveRecord = () => {
    const total =
      Number(assignmentMarks) + Number(internalMarks);

    const grade = calculateGrade(total);

    const updatedStudents = students.map((student) =>
      student.name === studentName
        ? {
            ...student,
            subject,
            attendance,
            assignmentMarks,
            internalMarks,
            total,
            grade
          }
        : student
    );

    localStorage.setItem(
      'students',
      JSON.stringify(updatedStudents)
    );

    setStudents(updatedStudents);

    alert('Student record saved successfully');

    setSubject('');
    setStudentName('');
    setAttendance('');
    setAssignmentMarks('');
    setInternalMarks('');
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">👩‍🏫 Staff Dashboard</h2>

      <div className="form-box">
        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <select
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        >
          <option value="">Select Student</option>
          {students.map((student, index) => (
            <option key={index} value={student.name}>
              {student.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Attendance %"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        />

        <input
          placeholder="Assignment Marks"
          value={assignmentMarks}
          onChange={(e) =>
            setAssignmentMarks(e.target.value)
          }
        />

        <input
          placeholder="Internal Marks"
          value={internalMarks}
          onChange={(e) =>
            setInternalMarks(e.target.value)
          }
        />

        <button onClick={saveRecord}>
          💾 Save Record
        </button>
      </div>
    </div>
  );
}