var CryptoJS = require('crypto-js');

const encryption = (message) => {
    // const x = 7;
    var ciphertext = CryptoJS.AES.encrypt(message, 'secret').toString();
    return ciphertext;
};
const decryption = (encrypted) => {
    var bytes = CryptoJS.AES.decrypt(encrypted, 'secret');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

const generateResponse = (status, message, result, extraJson) => {
    if (result) {
        return {
            status: status || null,
            message: message || null,
            result: result || null,
            ...extraJson,
        };
    }

    return {
        status: status || null,
        message: message || null,
        ...extraJson,
    };
};

module.exports = {
    encryption,
    decryption,
    generateResponse,
};
