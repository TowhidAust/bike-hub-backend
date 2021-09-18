const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Mongoose } = require("mongoose");
const Signup = require("../../databse/auth/schema");
const { decryption, encryption } = require("../../helper");

const { verifyToken } = require("../../middleware");







router.get('/', verifyToken, (req, res)=>{

    jwt.verify(req.token, 'secretkey', (err, userData)=>{
        if(err){
            res.json({
                message: 'jwt token not valid',
                error: err
            })
        }else {
            res.json({
                message: "jwt verified",
                data: userData,
            })
        }
    })

})
