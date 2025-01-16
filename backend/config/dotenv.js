require('dotenv').config();
const requiredEnv = ['DB_URI', 'JWT_SECRET', 'PORT'];

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing required environment variable: ${env}`);
  }
});

module.exports = {
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
};