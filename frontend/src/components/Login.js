import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Login = ({ setToken, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', email: '', fullName: '', role: 'student' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API = axios.create({ baseURL: 'http://localhost:5000/api' });
      const response = isLogin 
        ? await API.post('/auth/login', { username: formData.username, password: formData.password })
        : await API.post('/auth/register', formData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setToken(response.data.token);
      setUser(response.data.user);
      toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', color: '#667eea', border: 'none', cursor: 'pointer' }}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
        <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '8px', fontSize: '12px' }}>
          <strong>Demo Accounts:</strong><br />
          Admin: admin / admin123<br />
          Staff: staff / staff123<br />
          Student: student / student123
        </div>
      </div>
    </div>
  );
};

export default Login;
