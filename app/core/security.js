const constant              = require(__basePath + '/app/config/constant');
const config                = require(constant.path.app + 'core/configuration');
const exception             = require(constant.path.app + 'core/exception');
const promise               = require('bluebird');
const moment                = require('moment');
const underscore            = require('underscore');
const crypto                = require(constant.path.app + 'core/crypto');
const secretKey             = config.get('security:dbSecretKey');
const TokenService          = require(constant.path.app + 'module/service/tokenService');

exports.validateRequest     = async (req, res, next) => {
    
    let token               = req.headers['authorization']

    try {
        if (!token) {
            throw new exception.AuthorizationException;
        }
     
        let securityConfig  = config.get(`security:userAuth`);

        let result          = TokenService.verifyToken(token, securityConfig.secret)
 
        req.tokenData       = result;

        return next();

    }
    catch (error) {        
        return next(error)
    }
};