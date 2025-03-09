const constant      = require(__basePath + 'app/config/constant');
const config        = require(constant.path.app + 'core/configuration');
const NodeException = require("node-exceptions");
const underscore    = require("underscore");
const {
    writeLogError,
    logger
}                   = require(constant.path.app + 'core/logger');


//Services Exception
class ApplicationException extends NodeException.LogicalException {
    constructor(errorKey = "ERROR_SERVER_ERROR", messageVariables = {}) {
        super();

        const error   = config.get(`APP_MESSAGES:${errorKey}`);

        this.message  = underscore.template(error.message)(messageVariables);
        this.status   = error.statusCode;
        this.code     = error.errorCode;
        this.response = this.response || {};
    }
}

class AuthException extends ApplicationException {
    constructor() {
        super('ERROR_AUTHENTICATION');
    }
}

class ClientConnectionTimeout extends ApplicationException {
    constructor(response = {}) {
        super('ERROR_CONNECTION_TIMEOUT');
        this.message = this.message + ' | ' + response.url
    }
}
class UnsupportedServiceActionException extends ApplicationException {
    constructor() {
        super('ERROR_UNSUPPORTED_SERVICE');
    }
}

class DataNotFoundException extends ApplicationException {
    constructor() {
        super('ERROR_DATA_NOT_FOUND');
    }
}

class CacheConnectionException extends ApplicationException {
    constructor() {
        super('ERROR_CACHE_CONNECTION');
    }
}

class ClientResponseTimeout extends ApplicationException {
    constructor(response = {}) {
        super('ERROR_CONNECTION_TIMEOUT');
        this.message = this.message + ' | ' + response.url
    }
}


class ValidationErrorException extends ApplicationException {
    constructor(response = {}) {
        super("ERROR_VALIDATION");

        this.response = response;
    }
}

class AlreadyExistsException extends ApplicationException {
    constructor() {
        super('ERROR_ALREADY_EXISTS');
    }
}

class InvalidUserException extends ApplicationException {
    constructor() {
        super('ERROR_INVALID_USER');
    }
}

class PasswordMismatchException extends ApplicationException {
    constructor() {
        super('ERROR_PASSWORD_MISMATCH');
    }
}

class PasswordAlreadyExistException extends ApplicationException {
    constructor() {
        super("PASSWORD_ALREADY_EXIST");
    }
}

class oldPasswordNotExistException extends ApplicationException {
    constructor() {
        super("OLD_PASSWORD_NOT_EXIST");
    }
}

class AuthorizationException extends ApplicationException {
    constructor() {
        super("ERROR_INVALID_AUTHORIZATIONTOKEN");
    }
}


class UserCollectionAlreadyExist extends ApplicationException {
    constructor(collectionName = '') {
        super("ERROR_USER_COLLECTION_ALREADY_EXIST", { collectionName : collectionName });
    }
}

class CollectionNotFoundException extends ApplicationException {
    constructor() {
        super("ERROR_COLLECTION_NOT_FOUND");
    }
}


class RecommendationsAlreadyExist extends ApplicationException {
    constructor(recommendations = []) {
        super("ERROR_RECOMMENDATION_ALREADY_EXIST", { recommendations : JSON.stringify(recommendations) });
    }
}

class CollectionRecommendationNotFoundException extends ApplicationException {
    constructor() {
        super("ERROR_COLLECTION_RECOMMENDATION_NOT_FOUND");
    }
}

/*
 * Error Handler 
 */
const errorHandler      = function (err, req, res, next) {
    let errResponse     = {
        status          : false,
        statusMessage   : err.message,
        statusCode      : err.code  || 'serverError',
        requestId       : req.requestId,
        response        : err.response || {}
    };

    writeLogError([req.requestId, 'errorHandler emitted', errResponse]);
    logger.error(req.requestId, err);

    return res.status(err.status || 500).json(errResponse)
};


class ModuleApiErrorException extends NodeException.LogicalException {
    constructor(result = {}) {
        super();
        this.message  = result.body.statusMessage;
        this.status   = result.status;
        this.code     = result.body.statusCode;
        this.response = result.body.response || {};
    }
}

/*
 * Error Handler 
 */
const unknownRouteHandler = function (req, res, next) {
    return next(new UnsupportedServiceActionException);
};

module.exports = {
    AlreadyExistsException                          : AlreadyExistsException,
    ModuleApiErrorException                         : ModuleApiErrorException,
    DataNotFoundException                           : DataNotFoundException,
    UnsupportedServiceActionException               : UnsupportedServiceActionException,
    ClientConnectionTimeout                         : ClientConnectionTimeout,
    ClientResponseTimeout                           : ClientResponseTimeout,
    ValidationErrorException                        : ValidationErrorException,
    AuthException                                   : AuthException,
    CacheConnectionException                        : CacheConnectionException,
    errorHandler                                    : errorHandler,
    unknownRouteHandler                             : unknownRouteHandler,
    PasswordMismatchException                       : PasswordMismatchException,
    InvalidUserException                            : InvalidUserException,
    PasswordAlreadyExistException                   : PasswordAlreadyExistException,
    oldPasswordNotExistException                    : oldPasswordNotExistException,
    AuthorizationException                          : AuthorizationException,
    UserCollectionAlreadyExist                      : UserCollectionAlreadyExist,
    CollectionNotFoundException                     : CollectionNotFoundException,
    RecommendationsAlreadyExist                     : RecommendationsAlreadyExist,
    CollectionRecommendationNotFoundException       : CollectionRecommendationNotFoundException,
};
