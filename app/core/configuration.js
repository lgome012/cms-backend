const nconf     = require('nconf');
nconf.argv().env();
const config    = require(__basePath + 'app/config/config.js');
nconf.defaults(config);
nconf.file('responseMessage', __basePath + 'app/config/responseMessage.json');

module.exports = nconf;