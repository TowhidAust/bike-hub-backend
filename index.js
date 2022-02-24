const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.static('./public'))



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())





/*mongodb connection starts here */
const DBURL = require('./properties').DBURL;
const mongoose = require('mongoose');
async function mongooseConnect() {
    await mongoose.connect(DBURL);
}
mongoose.connection.on("connected", () => {
    console.log("mongodb connected successfully", DBURL);
})
mongooseConnect().catch(err => console.log(err));


/*mongodb connection ends here */

app.use('/login', require('./src/routes/auth')) // by default indicates index.js?
app.use('/signup', require('./src/routes/auth/signup'))
app.use('/sellers', require('./src/routes/sellers'))
app.use('/productsUpload', require('./src/routes/productsUpload'))
app.use('/getProducts', require('./src/routes/productsUpload/getProduct'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 