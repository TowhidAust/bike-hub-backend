const express = require('express')
const app = express()
const port = 3000
app.use(express.json())


/*mongodb connection starts here */
const DBURL = require('../properties').DBURL;
const mongoose = require('mongoose');
async function mongooseConnect() {
    await mongoose.connect(DBURL);
}
mongoose.connection.on("connected", () => {
    console.log("mongodb connected successfully", DBURL);
})
mongooseConnect().catch(err => console.log(err));
/*mongodb connection ends here */


app.use('/login', require('./routes/auth/login'))
app.use('/signup', require('./routes/auth/signup'))
app.use('/customers', require('./routes/customers'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 