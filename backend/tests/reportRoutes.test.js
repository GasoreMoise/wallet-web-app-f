const { getSummaryReport } = require('../controllers/reportController');
const httpMocks = require('node-mocks-http');
const Transaction = require('../models/Transaction');

jest.mock('../models/Transaction');

test('getSummaryReport returns summary data', async () => {
  const req = httpMocks.createRequest({ user: { _id: 'userId' } });
  const res = httpMocks.createResponse();

  Transaction.aggregate.mockResolvedValueOnce([{ total: 100 }]).mockResolvedValueOnce([{ total: -50 }]);

  await getSummaryReport(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getData()).toEqual({ totalIncome: 100, totalExpense: -50 });
});