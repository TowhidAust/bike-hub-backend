const express = require('express');
var multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { verifyToken } = require('../../middleware');
const { generateResponse } = require('../../helper');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const userId = req.query?.userId;
		let filesDirectory = `uploads`;
		if (userId) {
			filesDirectory = `uploads/${userId}`;
			if (!fs.existsSync(filesDirectory)) {
				fs.mkdirSync(filesDirectory, { recursive: true });
				cb(null, filesDirectory);
			} else {
				cb(null, filesDirectory);
			}
		} else {
			cb(new Error('userId not found'));
		}
	},
	filename: function (req, file, cb) {
		cb(null, `picture_${Date.now()}${path.extname(file.originalname)}`);
	},
});
const upload = multer({ storage: storage });

router.post('/', [verifyToken, upload.array('used-bike-image', 6)], async (req, res) => {
	const srcList = [];
	for (let i = 0; i < req.files.length; i++) {
		srcList.push(req.files[i].path.replace(/\\/g, '/'));
	}
	res.status(200);
	return res.json(generateResponse(200, 'Image uploaded successfully', srcList));
});

module.exports = router;
