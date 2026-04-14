import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleRegister = () => {
    const users =
      JSON.parse(localStorage.getItem('users')) || [];

    users.push({
      username,
      password,
      role
    });

    localStorage.setItem(
      'users',
      JSON.stringify(users)
    );

    alert('Registration successful');

    setUsername('');
    setPassword('');
    setIsRegister(false);
  };

  const handleLogin = () => {
    const users =
      JSON.parse(localStorage.getItem('users')) || [];

    const demoUsers = [
      {
        username: 'admin',
        password: '123',
        role: 'admin'
      },
      {
        username: 'staff',
        password: '123',
        role: 'staff'
      },
      {
        username: 'student',
        password: '123',
        role: 'student'
      }
    ];

    const allUsers = [...demoUsers, ...users];

    const foundUser = allUsers.find(
      (user) =>
        user.username === username &&
        user.password === password
    );

    if (foundUser) {
      localStorage.setItem(
        'role',
        foundUser.role
      );

      onLogin(foundUser.role);
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div className="login-box">
      <h2>
        {isRegister
          ? '📝 Register'
          : '🔐 Login'}
      </h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />
      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />
      <br />
      <br />

      {isRegister && (
        <>
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="student">
              Student
            </option>
            <option value="staff">
              Staff
            </option>
            <option value="admin">
              Admin
            </option>
          </select>
          <br />
          <br />
        </>
      )}

      <button
        onClick={
          isRegister
            ? handleRegister
            : handleLogin
        }
      >
        {isRegister
          ? 'Register'
          : 'Login'}
      </button>

      <br />
      <br />

      <button
        onClick={() =>
          setIsRegister(!isRegister)
        }
      >
        {isRegister
          ? 'Go to Login'
          : 'Create Account'}
      </button>
    </div>
  );
}