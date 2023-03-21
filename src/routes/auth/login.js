const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Signup = require("../../databse/auth/auth-schema");
const { decryption, generateResponse, encryption } = require("../../helper");
const { ENV_VARIABLES } = require("../../utils/constants");
const { validateLoginPayload } = require("./validation");


router.post('/', async (req, res) => {
    const { phone, password } = req.body;
    const { isValid, message } = validateLoginPayload(req?.body);
    if (!isValid) {
        res.status(403);
        return res.json(generateResponse(403, message))
    }

    Signup.findOne({ phone: phone }, (error, data) => {
        if (error) {
            res.status(500);
            return res.json(generateResponse(500, error?.message));
        }

        if (data && password === decryption(data?.password)) {
            jwt.sign({ _id: data?._id, firstname: data?.firstname, lastname: data?.lastname }, ENV_VARIABLES.JWT_SECRET_KEY, (err, token) => {
                if (err) {
                    res.status(500);
                    return res.json(generateResponse(500, 'Jwt error'));
                }

                const userInfo = { id: data?._id, firstname: data?.firstname, lastname: data?.lastname, phone: data?.phone, role: data?.role }
                res.status(200);
                return res.json(generateResponse(200, 'Login success', userInfo, { token: token }))
            })
        } else {
            res.status(403);
            res.json(generateResponse(403, 'Invalid credentials'))
        }
    });

})

module.exports = router;