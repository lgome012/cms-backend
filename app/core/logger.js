const app         = require(__basePath + 'app/app.js');
const constant      = require(__basePath + '/app/config/constant');
const config        = require(constant.path.app + 'core/configuration');
const winston       = require('winston');
const moment        = require('moment');
const underscore    = require('underscore');
const nodeEnv       = process.env.NODE_ENV;
const utility       = require(constant.path.app + 'util/utility');

const logger        = winston.createLogger({
    emitErrs        : false,
    transports      : [
        new winston.transports.Console({
            level   : config.get('logging:consoleLevel'),
            label   : config.get('logging:label'),
            handleException: true,
            format  : winston.format.combine(
                winston.format.json(),
                winston.format.label({ label: config.get('logging:label') }),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf((options) => {
                    return "[" + options.timestamp + "] " +
                        options.label + "." + options.level.toUpperCase() + ": " +
                        (options.message ? options.message : ' ') +
                        (options.data ? options.data : ' ') +
                        (options.meta && Object.keys(options.meta).length ? '\n' + JSON.stringify(options.meta, null, 4) : '') +
                        (options.stack ? '\n' + options.stack : '');
                }),
            )
        })
    ]
});

const writeLogInfo      = (arr) => {
    if (!underscore.isEmpty(arr[2])) {
        if (underscore.isString(arr[2])) {
            try {
                arr[2] = JSON.parse(arr[2]);
            }
            catch (e) {
                arr[2] = { message : arr[2] };
            }
        }

        arr[2] = utility.maskData(arr[2], constant.keysToMask);
    }
    return logger.info(
        arr[0] + ' ' +  arr[1] + ' ',
        arr[2] && { 
            data : JSON.stringify(arr[2] instanceof Error ? arr[2].toString() : arr[2]),
            stack: arr[2] instanceof Error ? arr[2].stack : undefined
        },
    );
}

const writeLogError     = (arr) => {

    if (!underscore.isEmpty(arr[2])) {
        if (underscore.isString(arr[2])) {
            try {
                arr[2] = JSON.parse(arr[2]);
            }
            catch (e) {
                arr[2] = { message : arr[2] };
            }
        }
        arr[2] = utility.maskData(arr[2], constant.keysToMask);
    }

    return logger.error(
        arr[0] + ' ' +  arr[1] + ' ',
        arr[2] && { 
            data : JSON.stringify(arr[2] instanceof Error ? arr[2].toString() : arr[2]),
            stack: arr[2] instanceof Error ? arr[2].stack : undefined
        },
    );
}

/** Return Logger instances */
module.exports = {
    logger              : logger,
    writeLogInfo        : writeLogInfo,
    writeLogError       : writeLogError
};