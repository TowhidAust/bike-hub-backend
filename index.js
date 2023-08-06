/* eslint-disable no-console */
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require('mongoose');
const { errorLogger, errorResponder, invalidPathHandler } = require('./src/middleware/global-error-handler');

var allowlist = [
	'http://localhost:3005',
	'http://127.0.0.1:3005',
	'http://example2.com',
	'https://towhidaust-bikehub.netlify.app',
];
var corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (allowlist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(cors(corsOptionsDelegate));
app.use(express.static(__dirname + '/public'));
// app.use('/uploads', express.static('uploads'));

/**
 *setup .env file paths for dev, staging, prod
 */
if (process.env.NODE_ENV === 'development') {
	console.log('Running from development env');
	require('dotenv').config({
		path: path.resolve(__dirname, '.env.development'),
	});
} else if (process.env.NODE_ENV === 'production') {
	console.log('Running from production env');
	require('dotenv').config({
		path: path.resolve(__dirname, '.env.production'),
	});
} else {
	require('dotenv').config();
}

/**
 * mongodb connection starts here
 */
const DBURL = process.env.DB_CONNECTION_URL;
async function mongooseConnect() {
	await mongoose.connect(DBURL);
}
mongoose.connection.on('connected', () => {
	console.log('mongodb connected successfully', DBURL);
});
mongooseConnect().catch((err) => console.log('Mongoose connection error', err));

/**
 * Endpoints with specific routes
 */
app.get('/', (req, res) => {
	res.status(200);
	return res.json({ message: 'Server is running successfully' });
});

// auth
app.use('/login', require('./src/routes/auth/login'));
app.use('/signup', require('./src/routes/auth/signup'));
app.use('/update-user', require('./src/routes/auth/update-user'));
app.use('/get-user-details', require('./src/routes/auth/get-user-details'));

// portal
app.use('/refresh-token', require('./src/routes/auth/refresh-token'));
app.use('/list-bike', require('./src/routes/list-bike/list-bike'));
app.use('/used-bike-list', require('./src/routes/list-bike/get-used-bike-list'));
app.use('/used-bike-details', require('./src/routes/list-bike/get-used-bike-by-id'));
app.use('/add-constant-bike', require('./src/routes/constant-data/add-constant-bikes'));
app.use('/get-constant-bikes', require('./src/routes/constant-data/get-constant-bikes'));
app.use('/upload/multiple', require('./src/routes/upload/upload-image'));
app.use('/add-product-variant', require('./src/routes/admin/products/add-product-variant'));
app.use('/get-products', require('./src/routes/products/get-products'));

// admin
app.use('/approve-listed-bike', require('./src/routes/list-bike/approve-listed-bike'));
app.use('/add-product', require('./src/routes/admin/products/add-products'));
app.use('/get-product-variants', require('./src/routes/products/get-prod-variants'));
app.use('/update-product', require('./src/routes/admin/products/update-product'));
app.use('/update-product-variant', require('./src/routes/admin/products/update-prod-variant'));

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(port, () => {
	console.log(`Bike-Hub is listening at http://localhost:${port}`);
});
