const express = require('express');
const { verifyToken } = require('../../middleware');
const { generateResponse, promiseHandler } = require('../../utils/helper');
const Signup = require('../../databse/auth/auth-schema');
const { validateUpdateUserPayload } = require('../../validations/auth/auth-validation');

const router = express.Router();

router.patch('/:userId', verifyToken, async (req, res) => {
  const userId = req?.params?.userId;
  const payload = req?.body;
  const { isValid, details } = validateUpdateUserPayload(payload);

  if (!isValid) {
    return res.status(400).json(
      generateResponse(400, 'Payload is not valid', undefined, {
        type: 'FIELD_ERROR',
        details,
      }),
    );
  }

  if (!userId) {
    return res.status(400).json(generateResponse(400, 'User id not found'));
  }

  const [data, error] = await promiseHandler(Signup.findByIdAndUpdate(userId, payload));

  if (error) {
    return res.status(500).json(generateResponse(500, error?.message || 'Something went wrong!'))
  }

  if (data) {
    return res.status(200).json(generateResponse(200, 'Update Success', data));
  }

  return res.status(500).json(generateResponse(500, 'Something went wrong'))

});

module.exports = router;
