const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    return res.status(200).json({
      user: { role: 'admin' }
    });
  }

  return res.status(400).json({
    message: 'Invalid login'
  });
});

describe('Login API Test', () => {
  test('should login admin successfully', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'admin123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.role).toBe('admin');
  });
});