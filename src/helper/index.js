const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { ENV_VARIABLES } = require('../utils/constants');

const encryption = (message) => {
	// const x = 7;
	var ciphertext = CryptoJS.AES.encrypt(message, 'secret').toString();
	return ciphertext;
};
const decryption = (encrypted) => {
	var bytes = CryptoJS.AES.decrypt(encrypted, 'secret');
	var originalText = bytes.toString(CryptoJS.enc.Utf8);
	return originalText;
};
const generateResponse = (status, message, result, extraJson) => {
	if (result) {
		return {
			status: status || null,
			message: message || null,
			...extraJson,
			result: result || null,
		};
	}

	return {
		status: status || null,
		message: message || null,
		...extraJson,
	};
};
const verifyJwt = async (token) => {
	try {
		const usersData = await jwt.verify(
			token,
			ENV_VARIABLES.ACCESS_TOKEN_SECRET
		);
		return usersData;
	} catch (error) {
		if (error) {
			return false;
		}
	}
};
const promiseHandler = (promise) => {
	return promise
		.then((data) => [data, undefined])
		.catch((error) => Promise.resolve([undefined, error]));
};
module.exports = {
	encryption,
	decryption,
	generateResponse,
	verifyJwt,
	promiseHandler,
};
