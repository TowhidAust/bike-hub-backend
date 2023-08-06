const express = require('express');
const { verifyToken } = require('../../middleware');
const Signup = require('../../databse/auth/auth-schema');
const { generateResponse, promiseHandler } = require('../../utils/helper');

const router = express.Router();

router.get('/:userId', verifyToken, async (req, res) => {
  const userId = req?.params?.userId;

  if (!userId) {
    return res.status(400).json(generateResponse(400, 'UserId not found'));
  }

  /**
   * NOTE Using lean() method here which will 
   * Allow to modify the returned data
   * For example: delete data.password
   * Without using lean the returned data is readonly in mongoose 
   */
  const [data, error] = await promiseHandler(Signup.findById(userId).lean());

  if (error) {
    return res.status(500).json(generateResponse(500, error?.message || 'Something went wrong!'));
  }

  if (data) {
    delete data?.password;
    return res.status(200).json(generateResponse(200, 'User found successfully', data));
  }

  return res.status(500).json(generateResponse(500, 'Something went wrong!'));
});

module.exports = router;
