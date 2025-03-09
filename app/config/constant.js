const basePath = __basePath;

module.exports = {
    path                : {
        base            : basePath,
        app             : basePath + 'app/',
        module          : basePath + 'app/module/controller/',
        log             : basePath + 'asset/log/',
        keysPath        : basePath + 'asset/M2PKeys/',
        moduleV1        : basePath + 'app/module/controller/v1/',
        file            : basePath + 'asset/file/',
        model           : basePath + 'app/module/model/',
        test            : basePath + '__test__/'
    },

    keysToMask          : {
    },

    keysToSecure    : [
    ],

    jwtTokenExpiry      : 1800,
};
