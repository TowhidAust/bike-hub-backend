const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Mongoose } = require("mongoose");
const Signup = require("../../databse/auth/schema");
const { decryption, encryption } = require("../../helper");





router.post('/', async (req, res) => {
    var responseUer;
    const user = req.body;
    // query the whole users database
    const listOfUsers = await Signup.find({})
    

    let isUserExists = "no";
    for(const index in listOfUsers){
        const email = listOfUsers[index].email;
        const password = listOfUsers[index].password;

        if((user.email === email) && (user.password === decryption(password))){
            isUserExists = "yes";
            responseUer = listOfUsers[index];

            console.log(responseUer);

        }

    }


    if(isUserExists === "yes"){
        jwt.sign({user}, 'secretkey', (err, token)=>{
            return res.json({
                 message: "user login success",
                 token: token,
                 data: [{
                     username: responseUer.username,
                     email: responseUer.email,
                     phone: responseUer.phone,
                     address: responseUer.address,
                     role: responseUer.role,
                     serialId: responseUer._id
                     
                 }]
             })
         })
    }else{
        return res.sendStatus(403)
    }

  
})

module.exports = router;