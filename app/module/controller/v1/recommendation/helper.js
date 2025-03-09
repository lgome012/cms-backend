const constant              = require(__basePath + '/app/config/constant');
const underscore            = require('underscore');
const config                = require(constant.path.app + 'core/configuration');
const recommendationModel   = require(constant.path.app + 'module/model/mongo/recommendationModel');
const exception             = require(constant.path.app + 'core/exception');
const moment                = require('moment');
const collectionModel       = require(constant.path.app + 'module/model/mongo/collectionModel');
const userModel             = require(constant.path.app + 'module/model/mongo/userModel');

exports.createRecommendation    = async(requestId, tokenData, requestBody) => {
    try {
        let checkUser       = await userModel.getById({ _id : tokenData.id }); 
                
        if (underscore.isEmpty(checkUser)) {
            throw new exception.InvalidUserException()
        }

        let allRecommendations = underscore.flatten(underscore.map(requestBody.collections, (collection) => 
            underscore.map(collection.recommendations, (recommendation) => ({
                title       : recommendation.title,
                category    : collection.category,
                meta        : recommendation.meta,
                createdBy   : tokenData.email,
                updatedBy   : tokenData.email,
            }))
        ));

        const existingRecommendations = await recommendationModel.find({
            $or : allRecommendations.map(rec => ({ title : rec.title, category : rec.category }))
        });        

        const existingSet = new Set(existingRecommendations.map(rec => rec.title + rec.category));        

        let newRecommendations = allRecommendations.filter(rec => !existingSet.has(rec.title + rec.category));

        if (newRecommendations.length === 0) {
            throw new exception.RecommendationsAlreadyExist(underscore.map(existingRecommendations, rec => ({
                title: rec.title,
                category: rec.category
            })))
        }

        let result = await recommendationModel.insertMany(newRecommendations)
        
        return result
    }
    catch(error) {
        throw error
    }
}

exports.getAllCollectionRecommendation= async(requestId, tokenData, requestQuery) => {
    try {        
        let checkUser       = await userModel.getById({ _id : tokenData.id }); 
        
        if (underscore.isEmpty(checkUser)) {
            throw new exception.InvalidUserException()
        }

        let result          = await recommendationModel.getAll(requestQuery.page, requestQuery.limit, { category : requestQuery.category }); 

        return result
    }
    catch(error) {
        throw error 
    }
}

exports.deleteRecommendationFromCollection= async(requestId, tokenData, requestParams) => {
    try {              
        let checkUser       = await userModel.getById({ _id : tokenData.id }); 
        
        if (underscore.isEmpty(checkUser)) {
            throw new exception.InvalidUserException()
        }

        let result          = await recommendationModel.getById({ _id : requestParams.recommendationId }); 
        
        if (underscore.isEmpty(result)) {
            throw new exception.CollectionRecommendationNotFoundException()
        }

        await recommendationModel.model.deleteOne({ _id: requestParams.recommendationId });

        return true
    }
    catch(error) {
        throw error 
    }
}