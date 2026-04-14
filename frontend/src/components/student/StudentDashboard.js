import React, { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loggedUser =
      JSON.parse(localStorage.getItem('loggedUser'));

    const students =
      JSON.parse(localStorage.getItem('students')) || [];

    const foundStudent = students.find(
      (s) => s.name === loggedUser.username
    );

    setStudent(foundStudent);
  }, []);

  if (!student)
    return <h2 style={{ textAlign: 'center' }}>No Data</h2>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">
        🎓 Student Dashboard
      </h2>

      <div className="student-card">
        <p><b>Name:</b> {student.name}</p>
        <p><b>Subject:</b> {student.subject}</p>
        <p><b>Attendance:</b> {student.attendance}%</p>
        <p>
          <b>Assignment Marks:</b>{' '}
          {student.assignmentMarks}
        </p>
        <p>
          <b>Internal Marks:</b>{' '}
          {student.internalMarks}
        </p>
        <p><b>Total:</b> {student.total}</p>
        <p><b>Grade:</b> {student.grade}</p>
      </div>
    </div>
  );
}