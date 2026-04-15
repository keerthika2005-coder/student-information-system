import React, { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    const students = JSON.parse(localStorage.getItem("students")) || [];

    // ✅ SAFE CHECK
    if (!loggedUser) return;

    // ✅ BETTER MATCH (ROLL NO OR NAME)
    const foundStudent = students.find(
      (s) =>
        s.rollNo === loggedUser.username ||
        s.name === loggedUser.username
    );

    setStudent(foundStudent || null);
  }, []);

  // ❌ NO DATA UI (better UX)
  if (!student) {
    return (
      <div style={styles.center}>
        <h2>❌ No Student Data Found</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎓 Student Dashboard</h2>

      <div style={styles.card}>
        <p><b>Name:</b> {student.name}</p>
        <p><b>Roll No:</b> {student.rollNo}</p>
        <p><b>Subject:</b> {student.subject}</p>

        <hr />

        <p><b>Attendance:</b> {student.attendance}%</p>
        <p><b>Assignment Marks:</b> {student.assignmentMarks}</p>
        <p><b>Internal Marks:</b> {student.internalMarks}</p>

        <hr />

        <p><b>Total:</b> {student.total}</p>
        <p><b>Grade:</b> {student.grade}</p>

        <p>
          <b>Result:</b>{" "}
          {student.total >= 50 ? "PASS ✔" : "FAIL ❌"}
        </p>

        <p>
          <b>Attendance Status:</b>{" "}
          {student.attendance < 75 ? "SHORTAGE ⚠" : "OK ✔"}
        </p>
      </div>
    </div>
  );
}

/* 🎨 INLINE CSS */
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #dbeafe, #e0e7ff)",
    padding: "20px"
  },
  title: {
    marginBottom: "20px",
    color: "#1e3a8a"
  },
  card: {
    width: "350px",
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    textAlign: "left"
  },
  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};