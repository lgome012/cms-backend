const constant      = require(__basePath + 'app/config/constant');
const config        = require(constant.path.base + 'app/core/configuration');
const crypto        = require(constant.path.app + 'core/crypto');
const secretKey     = config.get('security:jwtEncryptionKey');


class PasswordService {
    static hashPassword(password) {
        return crypto.hashSHA256(password, secretKey);
    }
}

module.exports = PasswordService;
