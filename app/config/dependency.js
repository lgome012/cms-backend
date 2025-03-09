const constant                  = require(__basePath + 'app/config/constant');
const moment                    = require('moment');
const response                  = require(constant.path.app + 'util/response');
const cookieParser              = require('cookie-parser');
const security                  = require(constant.path.app + 'core/security.js');

module.exports = (app) => {
    app.use(cookieParser());
   
    // Service Health Check API
    app.get('/cms/api/v1/monitor/ping', (req, res) => {
        return res.status(200).json(response.build(req.requestId, 'SUCCESS', { response:'pong', time : moment().format('YYYY-MM-DD HH:mm:ss') })) 
    });

    app.use('/cms/api/v1/user',             require(constant.path.module + 'v1/user')(app).router);
    app.use('/cms/api/v1/collection',       security.validateRequest, require(constant.path.module + 'v1/collection')(app).router);
    app.use('/cms/api/v1/recommendation',   security.validateRequest, require(constant.path.module + 'v1/recommendation')(app).router);
};