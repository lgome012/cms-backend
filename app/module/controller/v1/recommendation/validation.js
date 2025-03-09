const constant          = require(__basePath + 'app/config/constant');
const validationHelper  = require(constant.path.app + 'util/validation');
const exception         = require(constant.path.app + 'core/exception');
const underscore        = require('underscore');
const joi               = require('joi');
const {
    writeLogInfo
}                       = require(constant.path.app + 'core/logger');
const config            = require(constant.path.app + 'core/configuration');

exports.createRecommendation = (req, res, next) => {
    writeLogInfo([ req.requestId, ' [recommendationValidation][createRecommendation][called] ' ]);

    const recommendationSchema = joi.object({
        title       : joi.string().required(),
        meta        : joi.object({
            author  : joi.string().optional(),
            director: joi.string().optional(),
            year    : joi.number().integer().min(1800).max(new Date().getFullYear()).optional()
        }).required()
    });

    const collectionSchema  = joi.object({
        title               : joi.string().required(),
        category            : joi.string().valid("Books", "Movies", "Music", "Games").required(),
        recommendations     : joi.array().items(recommendationSchema).min(1).required()
    });

    const schema    = joi.object({
        headers     : joi.object().keys({}),
        body        : joi.object({
            collections : joi.array().items(collectionSchema).min(1).required()
        }).required(),
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

exports.getAllCollectionRecommendation    = (req, res, next) => {

    writeLogInfo([ req.requestId, ' [recommendationValidation][getAllCollectionRecommendation][called] ' ]);

    const schema    = joi.object().keys({
        headers     : joi.object().keys({
            'authorization' : joi.string().required()
        }),
        body        : joi.object({}),
        params      : joi.object().keys({}),
        query       : joi.object().keys({
            page    : joi.number().default(1),
            limit   : joi.number().default(20),
            category: joi.string().valid("Books", "Movies", "Music", "Games")
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


exports.deleteRecommendationFromCollection= (req, res, next) => {

    writeLogInfo([ req.requestId, ' [recommendationValidation][deleteRecommendationFromCollection][called] ' ]);

    const schema    = joi.object().keys({
        headers     : joi.object().keys({
            'authorization' : joi.string().required()
        }),
        body        : joi.object({}),
        params      : joi.object().keys({
            recommendationId : joi.string().guid().required()
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