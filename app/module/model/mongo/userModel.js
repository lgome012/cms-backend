const constant      = require(__basePath + 'app/config/constant');
const underscore    = require('underscore');
const promise       = require('bluebird');
const BaseModel     = require(constant.path.app + 'module/model/mongo/baseModel');
const exception     = require(constant.path.app + 'core/exception');

class UsersModel {

    constructor() {
        this.model      = BaseModel.models.users;
    }

    insertOne(data) {
        return this.model.create(data);
    }

    insertMany(data) {
        return this.model.insertMany(data);
    }
    
    updateOne(conditions, data) {
        return this.model.updateOne(conditions, data);
    }

    updateMany(conditions, data) {
        return this.model.updateMany(conditions, data);
    }

    updateById(id, data) {
        return this.model.updateOne({ _id : id }, data);
    }

    getById(id) {
        return this.model.findById(id);
    }

    getByName(conditions) {
        return  this.model.findOne(conditions).sort({ createdAt: -1 }).limit(20);
    }

}

module.exports = (new UsersModel);
