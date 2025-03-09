const constant          = require(__basePath + 'app/config/constant');
const validationHelper  = require(constant.path.app + 'util/validation');
const exception         = require(constant.path.app + 'core/exception');
const underscore        = require('underscore');
const joi               = require('joi');
const {
    writeLogInfo
}                       = require(constant.path.app + 'core/logger');
const config            = require(constant.path.app + 'core/configuration');


exports.createCollection    = (req, res, next) => {

    writeLogInfo([ req.requestId, ' [collectionValidation][createCollection][called] ' ]);

    const schema    = joi.object().keys({
        headers     : joi.object().keys({
            'authorization' : joi.string().required()
        }),
        body        : joi.object({
            name    : joi.string().required(),
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

exports.getAllUserCollection    = (req, res, next) => {

    writeLogInfo([ req.requestId, ' [collectionValidation][getAllUserCollection][called] ' ]);

    const schema    = joi.object().keys({
        headers     : joi.object().keys({
            'authorization' : joi.string().required()
        }),
        body        : joi.object({}),
        params      : joi.object().keys({
            userId  : joi.string().guid().required()
        }),
        query       : joi.object().keys({
            page    : joi.number().default(1),
            limit   : joi.number().default(20),
        })
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

exports.getCollection   = (req, res, next) => {

    writeLogInfo([ req.requestId, ' [collectionValidation][getCollection][called] ' ]);

    const schema    = joi.object().keys({
        headers     : joi.object().keys({
            'authorization' : joi.string().required()
        }),
        body        : joi.object({}),
        params      : joi.object().keys({
            collectionId  : joi.string().guid().required()
        }),
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

exports.updateCollection    = (req, res, next) => {

    writeLogInfo([ req.requestId, ' [collectionValidation][updateCollection][called] ' ]);

    const schema    = joi.object().keys({
        headers     : joi.object().keys({
            'authorization' : joi.string().required()
        }),
        body        : joi.object({
            name    : joi.string().required(),
        }),
        params      : joi.object().keys({
            collectionId  : joi.string().guid().required()
        }),
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

exports.addRecommendationToCollection   = (req, res, next) => {
    writeLogInfo([ req.requestId, ' [collectionValidation][addRecommendationToCollection][called] ' ]);
    const schema    = joi.object().keys({
        headers     : joi.object().keys({
            'authorization' : joi.string().required()
        }),
        body: joi.object({
            recommendationIds: joi.array().items(joi.string().uuid()).min(1).required(),
        }),
        params      : joi.object().keys({
            collectionId  : joi.string().guid().required()
        }),
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

exports.deleteCollection    = (req, res, next) => {

    writeLogInfo([ req.requestId, ' [collectionValidation][deleteCollection][called] ' ]);

    const schema    = joi.object().keys({
        headers     : joi.object().keys({
            'authorization' : joi.string().required()
        }),
        body        : joi.object({}),
        params      : joi.object().keys({
            collectionId  : joi.string().guid().required()
        }),
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