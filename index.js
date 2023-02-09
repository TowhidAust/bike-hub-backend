const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const path = require('path');

/**
  *setup .env file paths for dev, staging, prod
*/
if(process.env.NODE_ENV === 'development') {
  console.log('Running from development env');
  require('dotenv').config({path: path.resolve(__dirname, '.env.development')});
} else if(process.env.NODE_ENV === 'production') {
  console.log('Running from production env');
  require('dotenv').config({path: path.resolve(__dirname, '.env.production')});
} else {
  require('dotenv').config();
}

/**
 * mongodb connection starts here 
*/ 
const DBURL = process.env.DB_CONNECTION_URL;
const mongoose = require('mongoose');
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
app.use('/login', require('./src/routes/auth/login'))
app.use('/signup', require('./src/routes/auth/signup'))
app.use('/customers', require('./src/routes/customers'))

app.listen(port, () => {
  console.log(`Bike-Hub is listening at http://localhost:${port}`)
}) 