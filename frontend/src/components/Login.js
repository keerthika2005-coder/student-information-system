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
      localStorage.setItem(
        'loggedUser',
        JSON.stringify(foundUser)
      );

      onLogin(foundUser.role);
    } else {
      alert('Invalid login');
    }
  };

  return (
    <div className="login-box">
      <h2>🎓 Learn Bridge Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>Admin: admin / 123</p>
      <p>Staff: staff / 123</p>
      <p>Student: student / 123</p>
    </div>
  );
}