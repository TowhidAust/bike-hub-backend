const express = require("express");
const router = express.Router();
const Signup = require("../../databse/auth/schema");
const { encryption } = require("../../helper");
const { generateJwtAndSaveUsersData } = require("./controller");



// signup user account
router.post('/', async (req, res) => {
    const usersData = req.body;
    const encryptedPass = encryption(usersData.password);
    usersData.password = encryptedPass;
    const listOfUsers = await Signup.find({})
    if(listOfUsers.length === 0){
        generateJwtAndSaveUsersData(usersData, res);
    } else{
        let isUserExists = "no";
        for(const index in listOfUsers){
            const email = listOfUsers[index].email;

            if(usersData.email === email){
                isUserExists = "yes";
                return res.json({
                    message:"user already exists"
                })
            }
        }

        if(isUserExists==="no"){
            generateJwtAndSaveUsersData(usersData, res);
        }
    }
})

module.exports = router;