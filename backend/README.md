# Backend Implementation

## Overview
This backend serves as a robust API for a financial management system, implemented using Node.js, Express, and MongoDB.

### Features
- User authentication (JWT-based)
- Transaction and budget management
- Comprehensive reporting
- Scalable folder structure
- Error handling and logging

### Folder Structure
- **config**: Environmental setup
- **controllers**: Business logic
- **models**: MongoDB schema definitions
- **routes**: API endpoints
- **services**: Reusable functions like email notifications
- **middlewares**: Authentication and error handling
- **utils**: Helper files for logging, constants, and errors
- **tests**: Unit and integration tests

### Setup
1. Install dependencies: `npm init -y`
2. Configure `.env` file:
   ```env
   DB_URI=your-mongodb-uri
   JWT_SECRET=your-secret
   PORT=your-port
   EMAIL_USER=your-email
   EMAIL_PASS=your-email-password
   ```
3. Start the server: `node server.js`

### API Endpoints
- **Auth**: `/users/login`, `/users/register`
- **Transactions**: `/transactions`
- **Budgets**: `/budgets`
- **Reports**: `/reports/summary`

### Testing
Run tests with:
```sh
npm test
```
- Unit tests are in the `tests/` folder.
- Integration tests use `supertest`.

### Deployment
Deployed using Docker or any cloud service supporting Node.js. Includes `.env` for secure configurations.