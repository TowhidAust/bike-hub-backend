const express = require('express');
var multer = require('multer');
const router = express.Router();
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');

const { verifyToken } = require('../../middleware');
const { generateResponse } = require('../../helper');
const { firebaseConfig } = require('../../firebase/firebase-config');
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', [verifyToken, upload.array('used-bike-image', 2)], async (req, res) => {
	const filesArr = req?.files;
	const userId = req.query?.userId;
	if (userId) {
		const uploadTasksPromiseArr = [];
		for (let i in filesArr) {
			const singleFile = filesArr[i];
			const metaData = { contentType: singleFile.mimetype };
			const firebaseStorageRef = ref(
				firebaseStorage,
				`images/${userId}/${Date.now()}${path.extname(singleFile?.originalname)}`,
			);
			const uploadTaskPromise = await uploadBytesResumable(firebaseStorageRef, singleFile.buffer, metaData);
			uploadTasksPromiseArr.push(uploadTaskPromise);
		}

		Promise.all(uploadTasksPromiseArr)
			.then(async (uploadTasksArr) => {
				const downloadUrlPromiseArr = uploadTasksArr.map(async (uploadTask) => {
					return await getDownloadURL(uploadTask?.ref);
				});
				Promise.all(downloadUrlPromiseArr).then((downloadUrlArr) => {
					res.status(200);
					return res.json(generateResponse(200, 'Image uploaded successfully', downloadUrlArr));
				});
			})
			.catch((error) => {
				res.status(500);
				return res.json(generateResponse(500, error?.message || 'Image upload error'));
			});
	}
});

module.exports = router;
