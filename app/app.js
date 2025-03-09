const constant      = require(__basePath + 'app/config/constant');
const app           = require('express')();
const bodyParser    = require('body-parser');
const helmet        = require('helmet');
const exception     = require(constant.path.app + 'core/exception');
const utility       = require(constant.path.app + 'util/utility');
const {
    writeLogInfo
}                   = require(constant.path.app + 'core/logger');

const path          = require('path');
const dotenv        = require('dotenv');
const basePath      = __basePath;

app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(bodyParser.json());
const setupSwagger = require(constant.path.app + "/config/swagger"); 
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    req.requestId       = utility.uuid();
    return next();
});
app.use((req, res, next) => {
    req.requestId   = req.headers['x-request-id'] || utility.uuid();
    return next();
});

/*
 * Injecting all dependencies Modules + common libs
 */
require(constant.path.app + 'config/dependency')(app);

setupSwagger(app);

/*
 * @description Catch 404 error if no route found
 */
app.use(exception.unknownRouteHandler);

/*
 * @description Error handler
 */
app.use(exception.errorHandler);

module.exports = app;
