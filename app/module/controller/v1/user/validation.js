const constant          = require(__basePath + 'app/config/constant');
const validationHelper  = require(constant.path.app + 'util/validation');
const exception         = require(constant.path.app + 'core/exception');
const underscore        = require('underscore');
const joi               = require('joi');
const {
    writeLogInfo
}                       = require(constant.path.app + 'core/logger');
const config            = require(constant.path.app + 'core/configuration');


exports.signUp          = (req, res, next) => {

    writeLogInfo([ req.requestId, ' [userValidation][signUp][called] ' ]);

    const schema    = joi.object().keys({
        headers     : joi.object().keys({}),
        body        : joi.object({
            fname           : joi.string().required(),
            email           : joi.string().email().required(),
            mobileNo        : joi.string().custom(validationHelper.customMethods.validMobileNo).required(),
            password        : joi.string().custom(validationHelper.customMethods.validPassword).required(),
            confirmPassword : joi.string()
                .valid(joi.ref('password'))
                .required()
                .messages({
                    'any.only'  : 'Confirm password must match password',
            }),
        }),
        params      : joi.object().keys({}),
        query       : joi.object().keys({})
    });

    let result      = schema.validate({
        headers     : req.headers,
        query       : req.query,
        body        : req.body,
        params      : req.params
    }, validationHelper.validationDefaultObject);

    underscore.extend(req, result.value);

    return result.error ? next(new exception.ValidationErrorException(validationHelper.parseError(result.error))) : next();
};

exports.login           = (req, res, next) => {

    writeLogInfo([ req.requestId, ' [userValidation][login][called] ' ]);

    const schema    = joi.object().keys({
        headers     : joi.object().keys({}),
        body        : joi.object({
            fname           : joi.string().required(),
            password        : joi.string().custom(validationHelper.customMethods.validPassword).required(),
        }),
        params      : joi.object().keys({}),
        query       : joi.object().keys({})
    });

    let result      = schema.validate({
        headers     : req.headers,
        query       : req.query,
        body        : req.body,
        params      : req.params
    }, validationHelper.validationDefaultObject);

    underscore.extend(req, result.value);

    return result.error ? next(new exception.ValidationErrorException(validationHelper.parseError(result.error))) : next();
};

exports.forgotPassword  = (req, res, next) => {

    writeLogInfo([ req.requestId, ' [userValidation][forgotPassword][called] ' ]);

    const schema    = joi.object().keys({
        headers     : joi.object().keys({}),
        body        : joi.object({
            fname           : joi.string().required(),
            password        : joi.string().custom(validationHelper.customMethods.validPassword).required(),
            confirmPassword : joi.string()
                .valid(joi.ref('password'))
                .required()
                .messages({
                    'any.only'  : 'Confirm password must match password',
            }),
        }),
        params      : joi.object().keys({}),
        query       : joi.object().keys({})
    });

    let result      = schema.validate({
        headers     : req.headers,
        query       : req.query,
        body        : req.body,
        params      : req.params
    }, validationHelper.validationDefaultObject);

    underscore.extend(req, result.value);

    return result.error ? next(new exception.ValidationErrorException(validationHelper.parseError(result.error))) : next();
};

exports.resetPassword   = (req, res, next) => {

    writeLogInfo([ req.requestId, ' [userValidation][resetPassword][called] ' ]);

    const schema    = joi.object().keys({
        headers     : joi.object().keys({}),
        body        : joi.object({
            fname           : joi.string().required(),
            oldPassword     : joi.string().custom(validationHelper.customMethods.validPassword).required(),
            newPassword     : joi.string().custom(validationHelper.customMethods.validPassword).required(),
        }),
        params      : joi.object().keys({}),
        query       : joi.object().keys({})
    });

    let result      = schema.validate({
        headers     : req.headers,
        query       : req.query,
        body        : req.body,
        params      : req.params
    }, validationHelper.validationDefaultObject);

    underscore.extend(req, result.value);

    return result.error ? next(new exception.ValidationErrorException(validationHelper.parseError(result.error))) : next();
};