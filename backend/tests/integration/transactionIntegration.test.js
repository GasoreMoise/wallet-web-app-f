const request = require('supertest');
const app = require('../app');

jest.mock('../models/Transaction');
const Transaction = require('../models/Transaction');

test('GET /transactions should return transactions', async () => {
  Transaction.find.mockResolvedValue([{ id: '1', amount: 100, category: 'Food' }]);

  const res = await request(app).get('/transactions').set('Authorization', 'Bearer token');

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveLength(1);
});
