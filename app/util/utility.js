const underscore    = require('underscore');
const { 
    v4              : uuidv4,
}                   = require('uuid');
const utility       = {};


/**
 * Generate a valid V4 UUID
 * @return string
 */
utility.uuid = function () {
    return uuidv4();
};

utility.maskData = (object, keysToMask) => {
    if (underscore.isString(object)) return object;

    const mask          = (objOrArr) => {
        if (underscore.isArray(objOrArr)){
            let masked    = [];
            for (let key in objOrArr) {
                let val           = objOrArr[key];
                let dipaisabazaarsplayCount  = keysToMask[key];

                if (underscore.isObject(val) || underscore.isArray(val)) {
                    let maskedValue = underscore.has(keysToMask, key) ? masked.push("******") : masked.push(mask(val));
                } else {
                    val         = "" + val;
                    let maskedValue = underscore.has(keysToMask, key) ? '******' + (0 !== displayCount ? val.slice(-displayCount) : "") : val;
                    masked.push(maskedValue);
                }
            }    

            return masked;
        } else {
            let masked    = {};
            for (let key in objOrArr) {
                let val             = objOrArr[key];
                let displayCount    = keysToMask[key];
            
                if (underscore.isObject(val) || underscore.isArray(val)) {
                    masked[key] = underscore.has(keysToMask, key) ? "******" : mask(val);
                } else {
                    val         = "" + val;
                    masked[key] = underscore.has(keysToMask, key) ? '******' + (0 !== displayCount ? val.slice(-displayCount) : "") : val;
                }
            }
            
            return masked;
        }
    };

    return mask(object);
}
module.exports = utility;