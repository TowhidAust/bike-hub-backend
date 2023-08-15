const express = require('express');
const { verifyToken } = require('../../middleware');
const { generateResponse } = require('../../utils/helper');
// const Signup = require('../../databse/auth/auth-schema');
// const { validateUpdateUserPayload } = require('../../validations/auth/auth-validation');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  // const bodyJson = req.body;
  return res.status(500).json(generateResponse(500, 'Something went wrong!'));
});

module.exports = router;
