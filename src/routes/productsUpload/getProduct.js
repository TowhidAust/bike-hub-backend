const express = require('express')
const router = express.Router()
const Product = require("../../databse/products/schema")






router.get("/", async (req, res) => {

    // uid = req.body.id,

    // const listOfImage= await Product.find({})
    // let singleImage = listOfImage[0]
    // console.log(singleImage)


})


module.exports = router;