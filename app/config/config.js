const dotenv                = require('dotenv');
const path                  = require('path');
const basePath              = __basePath;
dotenv.config({ path: path.resolve(basePath) + '/.env' })

module.exports = {
    baseUrl                 : process.env.SERVICE_BASE_URL,
    security                : {
        jwtEncryptionKey    : process.env.JWT_ENCRYPTION_KEY,
        dbSecretKey         : process.env.DATA_SECRET_KEY,
        userAuth            : {
            secret          : process.env.JWT_USER_AUTH_SECRET_KEY,
            tokenLife       : process.env.JWT_USER_AUTH_TOKEN_LIFE_IN_MINUTE
        },
    },

    logging                 : {
        label               : process.env.LOGGING_LABEL,
        consoleLevel        : process.env.LOGGING_CONSOLELEVEL
    },
    
    database                : {
        mongoMaster         : {
            host            : process.env.DATABASE_MONGO_MASTER_HOST,
            port            : process.env.DATABASE_MONGO_MASTER_PORT,
            database        : process.env.DATABASE_MONGO_MASTER_DATABASE,
            poolSize        : parseInt(process.env.DATABASE_MONGO_MASTER_PULL_SIZE)
        },
    },
};