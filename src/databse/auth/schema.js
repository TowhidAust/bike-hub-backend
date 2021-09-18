const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signupModel = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        // required: false
    }, 
    role: {  // either admin, reviewer, buyer, or seller
        type: String,
        required: true
    }






}, {timestamps: true})


const productModel = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    img: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true})

const Signup = mongoose.model('Users', signupModel);
const Product = mongoose.model('Product', productModel);

module.exports = {
    
    Signup,
    Product
}