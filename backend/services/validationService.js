const { body, param, validationResult } = require('express-validator');

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

const transactionValidationRules = [
  body('amount').isNumeric().withMessage('Amount must be numeric'),
  body('category').notEmpty().withMessage('Category is required'),
];

module.exports = { validate, transactionValidationRules };