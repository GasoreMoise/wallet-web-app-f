const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Transaction Routes', () => {
  test('GET /transactions should fetch all transactions', async () => {
    const response = await request(app).get('/transactions').set('Authorization', `Bearer valid_token`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('transactions');
  });

  test('POST /transactions should create a new transaction', async () => {
    const newTransaction = { description: 'Test Transaction', amount: 100, type: 'income' };
    const response = await request(app)
      .post('/transactions')
      .send(newTransaction)
      .set('Authorization', `Bearer valid_token`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('transaction');
    expect(response.body.transaction.description).toBe('Test Transaction');
  });
});
