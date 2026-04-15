import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const demoUsers = [
      { username: 'admin', password: '123', role: 'admin' },
      { username: 'staff', password: '123', role: 'staff' },
      { username: 'student', password: '123', role: 'student' }
    ];

    const foundUser = demoUsers.find(
      (user) =>
        user.username === username &&
        user.password === password
    );

    if (foundUser) {
      localStorage.setItem('role', foundUser.role);
      onLogin(foundUser.role);
    } else {
      alert('Invalid Username or Password');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={titleStyle}>🎓 Learn Bridge</h1>
        <h3>Student Information System</h3>

        <input
          style={inputStyle}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={buttonStyle} onClick={handleLogin}>
          🔐 Login
        </button>

        <div style={{ marginTop: '20px' }}>
          <p><b>Demo Login</b></p>
          <p>Admin → admin / 123</p>
          <p>Staff → staff / 123</p>
          <p>Student → student / 123</p>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: '#f4f7fc'
};

const boxStyle = {
  width: '380px',
  padding: '30px',
  textAlign: 'center',
  borderRadius: '15px',
  background: 'white',
  boxShadow: '0 2px 10px #ccc'
};

const titleStyle = {
  marginBottom: '10px'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};