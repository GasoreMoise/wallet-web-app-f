const request = require('supertest');
const app = require('../app');

test('POST /budgets should create a budget', async () => {
  const newBudget = { category: 'Food', amount: 200 };
  const res = await request(app).post('/budgets').send(newBudget).set('Authorization', 'Bearer token');

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('id');
});