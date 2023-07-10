const { FIREBASE_KEYS } = require('../utils/constants');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: FIREBASE_KEYS.FIREBASE_API_KEY,
	authDomain: FIREBASE_KEYS.FIREBASE_AUTH_DOMAIN,
	projectId: FIREBASE_KEYS.FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_KEYS.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_KEYS.FIREBASE_MESSAGE_SENDER_ID,
	appId: FIREBASE_KEYS.FIREBASE_APP_ID,
	measurementId: FIREBASE_KEYS.FIREBASE_MEASUREMENT_ID,
};

module.exports = {
	firebaseConfig,
};
