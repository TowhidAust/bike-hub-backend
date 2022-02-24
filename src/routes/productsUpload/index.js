// https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
// https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
// https://www.geeksforgeeks.org/file-uploading-in-node-js/

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Mongoose } = require("mongoose");
const Product = require("../../databse/products/schema");  // how to import multiple module, skipping some?
const { decryption, encryption } = require("../../helper");
const {createProductProfile} = require("./controller")

const { verifyToken, upload } = require("../../middleware");
const fs = require('fs');
const path = require('path')









router.post('/', verifyToken,   upload, (req, res, next)=>{

    console.log("**************Printing Post Request********************")

    console.dir(req.file)

    console.log(path.join(__dirname + '../../../../public/uploads/'))



    jwt.verify(req.token, 'secretkey',  (err, userData) => {

        if(err){
            res.json({
                message: 'jwt token not valid',
                error: err
            })
        }else {
            var obj = {
                uid: userData._id, // have to get from the jwt token
                name: req.body.name,
                description: req.body.description,
                image: {
                    data: fs.readFileSync(path.join(__dirname + '../../../../public/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            }
        
            
            Product.create(obj, (err, item) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.redirect("/")
                }
            })
            return res.json({
                message: "success!"
            })
        }

    })

    

})


module.exports = router