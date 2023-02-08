const express = require("express");
const router = express.Router();
const Signup = require("../../databse/auth/schema");
const { encryption, generateResponse } = require("../../helper");
const { generateJwtAndSaveUsersData } = require("./controller");

// signup user account
router.post("/", async (req, res) => {
  const usersData = req.body;


  // password encryption
  const encryptedPass = encryption(usersData?.password);
  const encryptedConfirmPassword = encryption(usersData?.confirmPassword);
  usersData.password = encryptedPass;
  usersData.confirmPassword = encryptedConfirmPassword;

  // check if this user already exists or not and create user
  const { phone } = usersData;
  Signup.countDocuments({ phone: phone }, (err, count) => {
    if (err) {
      res.status(500);
      return res.json(generateResponse(500, err.message))
    }
    if (count > 0) {
      res.status(403);
      return res.json(generateResponse(403, 'User already exists'));
    }
    generateJwtAndSaveUsersData(usersData, res);
  });

});

module.exports = router;
