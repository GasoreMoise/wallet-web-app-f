const { loginUser } = require('../controllers/authController');
const httpMocks = require('node-mocks-http');
const User = require('../models/User');

jest.mock('../models/User');

test('loginUser should return a token for valid credentials', async () => {
  const req = httpMocks.createRequest({ body: { email: 'test@example.com', password: '123456' } });
  const res = httpMocks.createResponse();

  User.findOne.mockResolvedValue({ email: 'test@example.com', password: 'hashedpassword', comparePassword: jest.fn().mockResolvedValue(true) });

  await loginUser(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getData()).toHaveProperty('token');
});