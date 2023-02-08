const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Signup = require("../../databse/auth/schema");
const { decryption, generateResponse, encryption } = require("../../helper");


router.post('/', async (req, res) => {
    console.log('called login')
    const user = req.body;
    const { phone, password } = req.body;
    const encryptedPass = encryption(password)
    console.log(encryptedPass);
    // query the whole users database
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
                res.status(200);
                return res.json(generateResponse(200, 'Login success', null, { token: token }))
            })
        } else {
            res.status(403);
            res.json(generateResponse(403, 'Credentials are not valid'))
        }
    });




})

module.exports = router;