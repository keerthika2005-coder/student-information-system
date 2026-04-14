import React, { useState } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://student-information-system-f2js.onrender.com/api'
});

const Login = ({ setToken, setUser }) => {
  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    role: 'student'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = isRegister
        ? await API.post('/auth/register', formData)
        : await API.post('/auth/login', {
            username: formData.username,
            password: formData.password
          });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      setToken(response.data.token);
      setUser(response.data.user);

      alert(
        isRegister
          ? 'Registration successful'
          : 'Login successful'
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          'Something went wrong'
      );
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1>🎓 Learn Bridge</h1>
        <h3>
          {isRegister ? 'Register' : 'Login'}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            style={inputStyle}
            required
          />

          {isRegister && (
            <>
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <select
                name="role"
                onChange={handleChange}
                style={inputStyle}
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
            </>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <button
            type="submit"
            style={buttonStyle}
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <p
          onClick={() =>
            setIsRegister(!isRegister)
          }
          style={{ cursor: 'pointer' }}
        >
          {isRegister
            ? 'Go to Login'
            : 'Create Account'}
        </p>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: '#f4f6f8'
};

const cardStyle = {
  width: '400px',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 0 10px #ccc',
  background: '#fff',
  textAlign: 'center'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  cursor: 'pointer'
};

export default Login;