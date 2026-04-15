import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      onLogin('admin');
    } else if (username === 'staff' && password === '123') {
      onLogin('staff');
    } else if (username === 'student' && password === '123') {
      onLogin('student');
    } else {
      alert('Invalid login');
    }
  };

  return (
    <div style={container}>
      <div style={box}>
        <h1>🎓 Learn Bridge Login</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={handleLogin} style={button}>
          Login
        </button>

        <p>Admin: admin / 123</p>
        <p>Staff: staff / 123</p>
        <p>Student: student / 123</p>
      </div>
    </div>
  );
}

const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: '#f4f6f9'
};

const box = {
  width: '400px',
  padding: '40px',
  borderRadius: '15px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  background: 'white',
  textAlign: 'center'
};

const input = {
  width: '100%',
  padding: '12px',
  margin: '10px 0',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

const button = {
  width: '100%',
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  background: '#4CAF50',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer'
};