const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const productModel = new Schema({

    uid: {
      type: String,
      required: true  
    },

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    image: {
        data: Buffer,
        contentType: String
    },
    quanity: {
        type: Number,
        required: false
    },

    productType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }

}, {timestamps: true})


const Product = mongoose.model('Product', productModel);

module.exports = Product;