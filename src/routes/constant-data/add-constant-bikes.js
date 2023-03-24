const express = require('express');
const Signup = require('../../databse/auth/auth-schema');
const ConstantBikeSchema = require('../../databse/constant-data/add-constant-bikes-schema');
const { generateResponse, verifyJwt, promiseHandler } = require('../../helper');
const { verifyToken } = require('../../middleware');
const { validateAddConstantBikePayload } = require('./validation');
const router = express.Router();

/**
 * 1. validate body json with proper format
 * 2. validate with jwt token
 * 3. check if the user is admin or not
 * 4. check the bike is exists or not
 * 5. finally add the bike in the db list
 */

router.post('/', verifyToken, async (req, res) => {
    const bodyJson = req?.body;
    const jwtUserData = await verifyJwt(req.token);
    const { isValid, details } = validateAddConstantBikePayload(bodyJson);

    if (!isValid) {
        res.status(401);
        return res.json(
            generateResponse(401, 'Payload is not valid', undefined, {
                details: {
                    type: 'FIELD_ERROR',
                    details,
                },
            })
        );
    }

    if (!jwtUserData) {
        res.status(401);
        return res.json(generateResponse(403, 'Unauthorized user'));
    }

    const [lastInsertedDocument, lastInsertedDocumentErr] =
        await promiseHandler(
            ConstantBikeSchema.find({}).sort({ _id: -1 }).limit(1)
        );

    if (lastInsertedDocumentErr) {
        res.status(500);
        return res.json(
            generateResponse(500, lastInsertedDocumentErr?.message)
        );
    }

    if (bodyJson?.bikeCode !== lastInsertedDocument[0]?.bikeCode + 1) {
        res.status(409);
        return res.json(
            generateResponse(
                409,
                `Your bike code should be ${
                    lastInsertedDocument[0].bikeCode + 1
                }`
            )
        );
    }

    const [userData, userDataErr] = await promiseHandler(
        Signup.findById(jwtUserData?._id)
    );
    if (!userData?.role?.includes('SUPER_ADMIN')) {
        res.status(403);
        return res.json(generateResponse(403, 'Unauthorized user'));
    }
    if (userDataErr) {
        res.status(500);
        return res.json(
            generateResponse(
                500,
                userDataErr?.message ?? 'User not found in db'
            )
        );
    }

    const [count, countErr] = await promiseHandler(
        ConstantBikeSchema.countDocuments({
            bikeCode: bodyJson?.bikeCode,
        })
    );

    if (countErr) {
        res.status(500);
        return res.json(generateResponse(500, countErr?.message));
    }

    if (count > 0) {
        res.status(409);
        return res.json(generateResponse(409, 'This bike is already listed'));
    }

    const newConstantBikeList = new ConstantBikeSchema(bodyJson);
    const [savedData, savedDataErr] = await promiseHandler(
        newConstantBikeList.save()
    );

    if (savedDataErr) {
        res.status(500);
        return res.json(generateResponse(500, countErr?.message));
    }

    if (savedData) {
        res.status(200);
        return res.json(
            generateResponse(200, 'Bike listed successfully', savedData)
        );
    }
});

module.exports = router;
