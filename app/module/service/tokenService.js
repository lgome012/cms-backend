const constant      = require(__basePath + 'app/config/constant');
const jwtEngine     = require('jsonwebtoken');
const underscore    = require('underscore');
const config        = require(constant.path.base + 'app/core/configuration');
const exception     = require(constant.path.app + 'core/exception');
const crypto        = require(constant.path.app + 'core/crypto');
const secretKey     = config.get('security:jwtEncryptionKey');

class TokenService {
    static generateAuthToken(data, secret, options = {}) {        
        try {
            data = crypto.encryptDataAES256(JSON.stringify(data), secretKey);

            return jwtEngine.sign({ data: data }, secret, options);

        } catch (error) {
            throw new exception.AuthException();
        }
    }
    
    static verifyToken(token, secret, options = {}) {
        try {
            let decoded = jwtEngine.verify(token, secret);
            
            let decodedData =  crypto.decryptDataAES256(decoded.data, secretKey);
            
            return JSON.parse(decodedData);

        } catch (error) {
            throw new exception.AuthException();
        }
    }
}

module.exports = TokenService;
