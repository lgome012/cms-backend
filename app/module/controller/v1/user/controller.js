const constant              = require(__basePath + '/app/config/constant');
const underscore            = require('underscore');
const response              = require(constant.path.app + 'util/response');
const { 
    writeLogInfo, 
    writeLogError 
}                           = require(constant.path.app + 'core/logger');
const promise               = require('bluebird');
const utility               = require(constant.path.app + 'util/utility');
const exception             = require(constant.path.app + 'core/exception');
const config                = require(constant.path.app + 'core/configuration');
const authService           = require(constant.path.app + 'module/service/authService');

exports.signUp              = async (req, res, next) => {
    let requestId           = req.requestId;
    try {
        writeLogInfo([ requestId, ' [userController][signUp][called] ' ]);

        let responseBody    = await authService.signUp(requestId, req.body)

        writeLogInfo([ requestId, ' [userController][signUp][success] ', responseBody.id ]);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [userController][signUp][failed] ', error ]);
        return next(error)
    }
}

exports.login               = async (req, res, next) => {
    let requestId           = req.requestId;
    try {
        writeLogInfo([ requestId, ' [userController][login][called] ' ]);
        
        let responseBody    = await authService.login(requestId, req.body)

        writeLogInfo([ requestId, ' [userController][login][success] ', responseBody.user.id ]);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [userController][login][failed] ', error ]);
        return next(error)
    }
}


exports.forgotPassword      = async (req, res, next) => {
    let requestId           = req.requestId;
    try {
        writeLogInfo([ requestId, ' [userController][forgotPassword][called] ' ]);
        
        let responseBody    = await authService.forgotPassword(requestId, req.body);

        writeLogInfo([ requestId, ' [userController][forgotPassword][success] ' ]);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [userController][forgotPassword][failed] ', error ]);
        return next(error)
    }
}


exports.resetPassword       = async (req, res, next) => {
    let requestId           = req.requestId;
    try {
        writeLogInfo([ requestId, ' [userController][resetPassword][called] ' ]);
        
        let responseBody    = await authService.resetPassword(requestId, req.body);

        writeLogInfo([ requestId, ' [userController][resetPassword][success] ' ]);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [userController][resetPassword][failed] ', error ]);
        return next(error)
    }
}