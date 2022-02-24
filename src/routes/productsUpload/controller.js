const Product = require("../../databse/products/schema");
const multer = require('multer'); // required library for image upload
const path = require('path');





const createProductProfile = async (usersData, res) => {
    // save into db in users collection
    const product = new Product();
    product.name = usersData.name;
    product.description = usersData.description;

    


    await product.save();
    
    console.log(signup);
    jwt.sign({usersData}, 'secretkey', (err, token)=>{

        return res.json({
            message: "user signup success",
            token: token
        })
    })
}

module.exports ={
    createProductProfile
}