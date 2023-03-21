const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const path = require('path');
var cors = require('cors');
const mongoose = require('mongoose');




var allowlist = ['http://localhost:3005', 'http://127.0.0.1:3005', 'http://example2.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate))

/**
  *setup .env file paths for dev, staging, prod
*/
if (process.env.NODE_ENV === 'development') {
  console.log('Running from development env');
  require('dotenv').config({ path: path.resolve(__dirname, '.env.development') });
} else if (process.env.NODE_ENV === 'production') {
  console.log('Running from production env');
  require('dotenv').config({ path: path.resolve(__dirname, '.env.production') });
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
mongoose.connection.on("connected", () => {
  console.log("mongodb connected successfully", DBURL);
})
mongooseConnect().catch(err => console.log('Mongoose connection error', err));




/**
 * Endpoints with specific routes
 */
app.get('/', (req, res) => {
  res.status(200);
  return res.json({ message: 'Server is running successfully' })
})
app.use('/login', require('./src/routes/auth/login'))
app.use('/signup', require('./src/routes/auth/signup'))
app.use('/customers', require('./src/routes/customers'))

app.listen(port, () => {
  console.log(`Bike-Hub is listening at http://localhost:${port}`)
}) 