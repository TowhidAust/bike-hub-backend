const express = require('express');
const Signup = require('../../databse/auth/auth-schema');
const ConstantBikeSchema = require('../../databse/constant-data/add-constant-bikes-schema');
const { generateResponse, verifyJwt, promiseHandler } = require('../../utils/helper');
const { verifyToken } = require('../../middleware');
const { validateAddConstantBikePayload } = require('../../validations/constant-data/constat-data-validation');
const { USER_ROLES } = require('../../utils/constants');
const router = express.Router();

/**
 * 1. validate with jwt token firsr
 * 2. validate body json with proper format
 * 3. check the last inserted documents bikeId
 *  and suggest user to insert a valid bike id by incrementing 1
 * 4. check if the user is a super admin or not
 * 5. check the bike is exists or not
 * 6. finally add the bike in the db list
 */

router.post('/', verifyToken, async (req, res) => {
	const bodyJson = req?.body;
	// 1. validate with jwt token
	const jwtUserData = await verifyJwt(req?.token);

	if (!jwtUserData) {
		res.status(401);
		return res.json(generateResponse(401, 'Unauthorized user'));
	}

	// 2. validate body json with proper format
	const { isValid, details } = validateAddConstantBikePayload(bodyJson);

	if (!isValid) {
		res.status(400);
		return res.json(
			generateResponse(400, 'Payload is not valid', undefined, {
				type: 'FIELD_ERROR',
				details,
			}),
		);
	}

	// 3. check the last inserted documents bikeId and suggest user to insert a valid bike id by incrementing 1
	const [lastInsertedDocument, lastInsertedDocumentErr] = await promiseHandler(
		ConstantBikeSchema.find({}).sort({ _id: -1 }).limit(1),
	);

	if (lastInsertedDocumentErr) {
		res.status(500);
		return res.json(generateResponse(500, lastInsertedDocumentErr?.message));
	}

	if (lastInsertedDocument.length > 0 && bodyJson?.bikeCode !== lastInsertedDocument[0]?.bikeCode + 1) {
		res.status(409);
		return res.json(generateResponse(409, `Your bike code should be ${lastInsertedDocument[0]?.bikeCode + 1}`));
	}

	// 4. check if the user is a super admin or not
	const [userData, userDataErr] = await promiseHandler(Signup.findById(jwtUserData?._id));
	if (!userData?.role?.includes(USER_ROLES.SUPER_ADMIN)) {
		res.status(403);
		return res.json(generateResponse(403, 'Unauthorized user'));
	}
	if (userDataErr) {
		res.status(500);
		return res.json(generateResponse(500, userDataErr?.message ?? 'User not found in db'));
	}
	// 5. check the bike is exists or not
	const [count, countErr] = await promiseHandler(
		ConstantBikeSchema.countDocuments({
			bikeCode: bodyJson?.bikeCode,
		}),
	);

	if (countErr) {
		res.status(500);
		return res.json(generateResponse(500, countErr?.message || 'Error finding bike'));
	}

	if (count > 0) {
		res.status(409);
		return res.json(generateResponse(409, 'This bike is already listed'));
	}

	// 6. finally add the bike in the db list
	const newConstantBikeList = new ConstantBikeSchema(bodyJson);
	const [savedData, savedDataErr] = await promiseHandler(newConstantBikeList.save());
	if (savedDataErr) {
		res.status(500);
		return res.json(generateResponse(500, savedDataErr?.message || 'Error Saving into database'));
	}

	if (savedData) {
		res.status(200);
		return res.json(generateResponse(200, 'Bike listed successfully', savedData));
	}
});

module.exports = router;
