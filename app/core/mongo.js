const constant      = require(__basePath + '/app/config/constant');
const config        = require(constant.path.app + 'core/configuration');
const Mongoose      = require('mongoose');
const underscore    = require('underscore');
const {
    logger
}                   = require(constant.path.app + 'core/logger');

/** Class representing a database object */
class Mongo {

    /**
     * Create a Database Object.
     * @function constructor
     */
    constructor() {
        this.connections = {};
    }

    getConnection(dbName) {
        if (!this.connections[dbName]) {
            this._createPoolConnection(dbName);
        }
        return this.connections[dbName];
    }

    /*
     * Create pool connection 
     * @function _createPoolConnection
     * @return {void}
     */
    _createPoolConnection(dbName) {
        let connectionDetails   = config.get(`database:${dbName}`);

        const connectionUri     = `mongodb://${connectionDetails.host}:${connectionDetails.port}/${connectionDetails.database}`;

        const options           = {
            user                : underscore.result(connectionDetails, 'user', ''),
            pass                : underscore.result(connectionDetails, 'pass', ''),
        };

        const dbConnection      = Mongoose.createConnection(connectionUri, options);

        dbConnection.on('error', console.error.bind(console, `Connection error for ${dbName}:`));
        dbConnection.once('open', logger.info.bind(logger, `Connected to MongoDB for ${dbName}`));

        this.connections[dbName] = dbConnection;
    }
}

module.exports = (new Mongo);