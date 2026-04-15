import React, {
  useEffect,
  useState
} from 'react';
import axios from 'axios';

export default function StaffDashboard() {
  const [students, setStudents] = useState([]);
  const [rollNumber, setRollNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [attendance, setAttendance] = useState('');
  const [assignmentMarks, setAssignmentMarks] =
    useState('');
  const [internalMarks, setInternalMarks] =
    useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        'https://student-information-system-f2js.onrender.com/api/staff/students'
      );

      setStudents(res.data);
    } catch (error) {
      alert('Failed to fetch students');
    }
  };

  const saveMarks = async () => {
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

      alert('✅ Record saved successfully');

      setRollNumber('');
      setSubject('');
      setAttendance('');
      setAssignmentMarks('');
      setInternalMarks('');

      fetchStudents();
    } catch (error) {
      alert('❌ Save failed');
    }
  };

  return (
    <div style={container}>
      <h1>👩‍🏫 Staff Dashboard</h1>

      <div style={box}>
        <input
          style={input}
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) =>
            setRollNumber(e.target.value)
          }
        />

        <input
          style={input}
          placeholder="Subject"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
        />

        <input
          style={input}
          placeholder="Attendance %"
          value={attendance}
          onChange={(e) =>
            setAttendance(e.target.value)
          }
        />

        <input
          style={input}
          placeholder="Assignment Marks"
          value={assignmentMarks}
          onChange={(e) =>
            setAssignmentMarks(e.target.value)
          }
        />

        <input
          style={input}
          placeholder="Internal Marks"
          value={internalMarks}
          onChange={(e) =>
            setInternalMarks(e.target.value)
          }
        />

        <button
          style={button}
          onClick={saveMarks}
        >
          💾 Save Record
        </button>
      </div>

      <h2>📋 Student Dataset</h2>

      {students.map((student) => (
        <div
          key={student._id}
          style={card}
        >
          <p>
            <b>Name:</b> {student.name}
          </p>
          <p>
            <b>Roll No:</b>{' '}
            {student.rollNumber}
          </p>
          <p>
            <b>Department:</b>{' '}
            {student.department}
          </p>
        </div>
      ))}
    </div>
  );
}

const container = {
  width: '80%',
  margin: '30px auto',
  textAlign: 'center'
};

const box = {
  padding: '25px',
  boxShadow: '0 2px 10px #ccc',
  borderRadius: '15px',
  marginBottom: '30px'
};

const input = {
  width: '80%',
  padding: '12px',
  margin: '10px auto',
  display: 'block'
};

const button = {
  padding: '12px 20px'
};

const card = {
  width: '60%',
  margin: '15px auto',
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  textAlign: 'left'
};