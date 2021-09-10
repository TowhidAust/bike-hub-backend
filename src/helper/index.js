var CryptoJS = require("crypto-js");



const encryption = (message) => {
    var ciphertext = CryptoJS.AES.encrypt(message, 'secret').toString();
    return ciphertext
}


const decryption = (encrypted) => {
    var bytes  = CryptoJS.AES.decrypt(encrypted, 'secret');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}

module.exports = {
    encryption,
    decryption
}