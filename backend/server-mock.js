const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// Mock user data
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$rVqGjqL5pL5pL5pL5pL5pO', // admin123
    email: 'admin@school.com',
    fullName: 'System Admin',
    role: 'admin'
  },
  {
    id: 2,
    username: 'staff',
    password: '$2a$10$rVqGjqL5pL5pL5pL5pL5pO', // staff123
    email: 'staff@school.com',
    fullName: 'John Staff',
    role: 'staff'
  },
  {
    id: 3,
    username: 'student',
    password: '$2a$10$rVqGjqL5pL5pL5pL5pL5pO', // student123
    email: 'student@school.com',
    fullName: 'John Student',
    role: 'student'
  }
];

// Mock student data
const students = [
  {
    _id: 1,
    rollNumber: 'CS2401',
    name: 'John Student',
    email: 'student@school.com',
    department: 'Computer Science',
    semester: 3,
    cgpa: 3.65
  },
  {
    _id: 2,
    rollNumber: 'CS2402',
    name: 'Jane Smith',
    email: 'jane@school.com',
    department: 'Computer Science',
    semester: 3,
    cgpa: 3.82
  }
];

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { userId: user.id, role: user.role, username: user.username },
    'secret_key',
    { expiresIn: '7d' }
  );
  
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    }
  });
});

app.post('/api/auth/register', async (req, res) => {
  const { username, password, email, fullName, role } = req.body;
  const newUser = {
    id: users.length + 1,
    username,
    password: await bcrypt.hash(password, 10),
    email,
    fullName,
    role
  };
  users.push(newUser);
  
  const token = jwt.sign(
    { userId: newUser.id, role: newUser.role, username: newUser.username },
    'secret_key',
    { expiresIn: '7d' }
  );
  
  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role
    }
  });
});

// Admin routes
app.get('/api/admin/dashboard/stats', (req, res) => {
  res.json({
    totalStudents: 156,
    totalStaff: 12,
    totalCourses: 24
  });
});

app.get('/api/admin/students', (req, res) => {
  res.json(students);
});

// Staff routes
app.get('/api/staff/dashboard/stats', (req, res) => {
  res.json({
    totalStudents: 156,
    totalCourses: 24
  });
});

// Student routes
app.get('/api/student/dashboard', (req, res) => {
  res.json({
    student: students[0],
    grades: [],
    attendance: { total: 32, present: 28, percentage: 87.5 }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on port ${PORT}`);
  console.log('✅ No MongoDB required!');
  console.log('\n📝 Demo Accounts:');
  console.log('   Admin: admin / admin123');
  console.log('   Staff: staff / staff123');
  console.log('   Student: student / student123');
});
