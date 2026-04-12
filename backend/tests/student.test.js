const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/api/student/add', (req, res) => {
  const student = req.body;

  return res.status(200).json({
    message: 'Student added successfully',
    student
  });
});

describe('Student API Test', () => {
  test('should add student successfully', async () => {
    const res = await request(app)
      .post('/api/student/add')
      .send({
        name: 'Keerthika',
        marks: 90
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.student.name).toBe('Keerthika');
  });
});