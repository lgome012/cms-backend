const constant      = require(__basePath + 'app/config/constant');
const config        = require(constant.path.app + 'core/configuration');
const underscore    = require("underscore");
const response      = {};

response.build      = (requestId, key, response, additionalResponse = {}) => {
    const responseObj   = config.get("APP_MESSAGES:" + key);

    let responseBody    = {
        status          : key === 'SUCCESS',
        statusCode      : responseObj.errorCode,
        statusMessage   : responseObj.message,
        requestId       : requestId,
        response        : response || {}
    };

    if (false === underscore.isEmpty(additionalResponse)) {
        responseBody    = underscore.extend(responseBody, additionalResponse);
    }

    return responseBody;
};
module.exports = response;
