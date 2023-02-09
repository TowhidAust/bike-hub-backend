const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Signup = require("../../databse/auth/schema");
const { decryption, generateResponse, encryption } = require("../../helper");


router.post('/', async (req, res) => {
    const { phone, password } = req.body;
    
    Signup.findOne({ phone: phone }, (error, data) => {
        if (error) {
            res.status(500);
            return res.json(500, error?.message);
        }
        if (password === decryption(data?.password)) {
            jwt.sign({ firstname: data?.firstname, lastname: data?.lastname, id: data?._id }, 'secretkey', (err, token) => {
                if (err) {
                    res.status(500);
                    return res.json(generateResponse(500, 'Jwt error'));
                }

                const userInfo = {id: data?._id, firstname: data?.firstname, lastname: data?.lastname, phone: data?.phone}
                res.status(200);
                return res.json(generateResponse(200, 'Login success', userInfo, {token: token}))
            })
        } else {
            res.status(403);
            res.json(generateResponse(403, 'Invalid credentials'))
        }
    });
    
})

module.exports = router;