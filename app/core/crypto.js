const constant      = require(__basePath + 'app/config/constant');
const underscore    = require('underscore');
const cryptoCore    = require('crypto');
const CryptoJS      = require('crypto-js');

class CryptoJs {
    encryptDataAES256 (dataToEncrypt, secret) {        
        if(underscore.isEmpty(dataToEncrypt)){
            return dataToEncrypt;
        }
        return CryptoJS.AES.encrypt(dataToEncrypt, secret)
            .toString();
    }

    decryptDataAES256 (dataToDecrypt, secret) {
        if(underscore.isEmpty(dataToDecrypt)){
            return dataToDecrypt;
        }
        return CryptoJS.AES.decrypt(dataToDecrypt, secret)
            .toString(CryptoJS.enc.Utf8);
    }

    hashSHA256(text, key, encoding = 'base64') {
        return cryptoCore.createHmac('sha256', key).update(text).digest(encoding);
    }
};
module.exports = new CryptoJs;