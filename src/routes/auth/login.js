const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Signup = require("../../databse/auth/schema");
const { decryption } = require("../../helper");


router.post('/', async (req, res) => {
    const user = req.body;
    // query the whole users database
    const listOfUsers = await Signup.find({})
    

    let isUserExists = "no";
    for(const index in listOfUsers){
        const email = listOfUsers[index].email;
        const password = listOfUsers[index].password;

        if((user.email === email) && (user.password === decryption(password))){
            isUserExists = "yes";
        }
    }

    if(isUserExists === "yes"){
        jwt.sign({user}, 'secretkey', (err, token)=>{
            return res.json({
                 message: "user login success",
                 token: token,
                 data: [{
                     username: user.username,
                     email: user.email,
                     
                 }]
             })
         })
    }else{
        return res.sendStatus(403)
    }

  
})

module.exports = router;