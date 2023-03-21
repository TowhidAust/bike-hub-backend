const jwt = require("jsonwebtoken");
const Signup = require("../../databse/auth/auth-schema");
const { generateResponse } = require("../../helper");
const { ENV_VARIABLES } = require("../../utils/constants");

const generateJwtAndSaveUsersData = async (usersData, res) => {

  // save into db in users collection
  delete usersData.confirmPassword;
  const signup = new Signup(usersData);

  try {
    const data = await signup.save();

    // we should not save any password in jwt so removing it
    const dataWithoutPassword = {
      _id: data?._id,
      firstname: data?.firstname,
      lastname: data?.lastname,
      phone: data?.phone,
      role: data?.role,
      createdAt: data?.createdAt
    }

    jwt.sign({ dataWithoutPassword }, ENV_VARIABLES.JWT_SECRET_KEY, (err, token) => {
      if (err) {
        res.status(500);
        return res.json(generateResponse(500, 'Error generating Jwt token'))
      }
      res.status(200);
      return res.json(generateResponse(200, 'User created successfully', null, {
        token: token,
        result: dataWithoutPassword
      }));
    });

  } catch (error) {
    res.status(500);
    return res.json(generateResponse(500, error?.message));
  }

};

module.exports = {
  generateJwtAndSaveUsersData,
};
