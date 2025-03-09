const underscore    = require('underscore');
const validation    = {};
const constant      = require(__basePath + 'app/config/constant');
const moment        = require('moment');

validation.validationDefaultObject =  {
    abortEarly  : false,
    stripUnknown: true,
    convert     : true,
    language    : {
        any : {
            required    : "{{label}} is required"
        }
    }
};

validation.parseError =  (errorContext) => {
    let errorObject = {};

    underscore.each(errorContext.details, (detail) => {
        errorObject[detail.context.key] = detail.message;
    });

    return errorObject;
}

validation.convertNumberStringInOjectToFloat  =  (object) => {
    return underscore.mapObject(object, (value) => {
        return false === isNaN(value) ? parseFloat(value) : value;
    });
};

validation.customMethods            =  {
    validPassword   : (value, helpers) => {
        const minLength = 8;
        const maxLength = 10;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    
        if (!passwordRegex.test(value)) {
          return helpers.message(
            `Password must be ${minLength}-${maxLength} characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.`
          );
        }
        return value; 
    },
    validMobileNo   : (value, helpers) => {
        const mobileNoRegex = /^[6-9]\d{9}$/; // Mobile number should start with 6-9 and be exactly 10 digits
    
        if (!mobileNoRegex.test(value)) {
            return helpers.message(`Invalid mobile number. It must start with 6-9 and be 10 digits long.`);
        }
        return value;
    }
}

module.exports = validation;