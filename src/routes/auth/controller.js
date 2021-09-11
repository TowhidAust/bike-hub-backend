
const jwt = require("jsonwebtoken");
const Signup = require("../../databse/auth/schema");

const generateJwtAndSaveUsersData = async (usersData, res) => {
    // save into db in users collection
    const signup = new Signup(usersData);
    await signup.save();
    

    
    jwt.sign({usersData}, 'secretkey', (err, token)=>{
        return res.json({
            message: "user signup success",
            token: token
        })
    })
}

module.exports ={
    generateJwtAndSaveUsersData
}