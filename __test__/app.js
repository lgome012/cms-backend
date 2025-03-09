global.__basePath           = process.cwd() + '/';
const app                   = require(__basePath + 'app/app');
const constant              = require(__basePath + '/app/config/constant');
const config                = require(constant.path.app + 'core/configuration');
module.exports = app