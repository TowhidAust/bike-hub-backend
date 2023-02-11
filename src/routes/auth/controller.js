const jwt = require("jsonwebtoken");
const Signup = require("../../databse/auth/schema");
const { generateResponse } = require("../../helper");

const generateJwtAndSaveUsersData = async (usersData, res) => {

  // save into db in users collection
  const signup = new Signup(usersData);

  try {
    await signup.save();
  } catch (error) {
    res.status(500);
    return res.json(generateResponse(500, error?.message));
  }

  // we should not save any password in jwt so removing it
  delete usersData.password;
  delete usersData.confirmPassword;

  jwt.sign({ usersData }, "secretkey", (err, token) => {
    if (err) {
      res.status(500);
      return res.json(generateResponse(500, 'Error generating Jwt token'))
    }
    res.status(200);
    return res.json(generateResponse(200, 'User created successfully', null, {
      token: token,
    }));
  });

};

module.exports = {
  generateJwtAndSaveUsersData,
};
