const constant      = require(__basePath + 'app/config/constant');
const underscore    = require('underscore');
const promise       = require('bluebird');
const BaseModel     = require(constant.path.app + 'module/model/mongo/baseModel');
const exception     = require(constant.path.app + 'core/exception');

class RecommendationModel {

    constructor() {
        this.model      = BaseModel.models.recommendations;
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

    getByName(conditions) {
        return  this.model.findOne(conditions).sort({ createdAt: -1 }).limit(20);
    }

    find(conditions) {
        return this.model.find(conditions);
    }

    getAll(page, limit, condition) {
        let list        = this.model.find(condition).sort({ createdAt: -1 })
            .skip((limit * page) - limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
    
        let totalCount  = this.model.countDocuments(condition);
        return promise.props({
            totalCount  : totalCount,
            list        : list
        })
    }

    getById(id) {
        return this.model.findById(id);
    }

    deleteOne(conditions) {
        return this.model.deleteOne(conditions);
    }

}

module.exports = (new RecommendationModel);
