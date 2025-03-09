const constant              = require(__basePath + '/app/config/constant');
const underscore            = require('underscore');
const config                = require(constant.path.app + 'core/configuration');
const collectionModel       = require(constant.path.app + 'module/model/mongo/collectionModel');
const userModel             = require(constant.path.app + 'module/model/mongo/userModel');
const exception             = require(constant.path.app + 'core/exception');
const moment                = require('moment');
const recommendationModel   = require(constant.path.app + 'module/model/mongo/recommendationModel');
const mongoose              = require("mongoose");

exports.createCollection    = async(requestId, payload) => {
    try {        
        let checkUser       = await userModel.getById({ _id : payload.id }); 
        
        if (underscore.isEmpty(checkUser)) {
            throw new exception.InvalidUserException()
        }

        let collectionPayload   = {
            name                : payload.name,
            userId              : payload.id,
        }

        let result              = await collectionModel.insertOne(collectionPayload);

        return result
    }
    catch(error) {
        switch (error.code) {
            case 11000 :
                throw new exception.UserCollectionAlreadyExist(error.keyValue.name)
            default : 
                throw error 
        }
    }
}

exports.getAllUserCollection= async(requestId, tokenData, requestParam, requestQuery) => {
    try {        
        let checkUser       = await userModel.getById({ _id : tokenData.id }); 
        
        if (underscore.isEmpty(checkUser)) {
            throw new exception.InvalidUserException()
        }

        let result          = await collectionModel.getAll(requestQuery.page, requestQuery.limit, { userId : requestParam.userId }); 

        return result
    }
    catch(error) {
        throw error 
    }
}

exports.getCollection       = async(requestId, payload) => {
    try {        
        let checkUser       = await userModel.getById({ _id : payload.id }); 
        
        if (underscore.isEmpty(checkUser)) {
            throw new exception.InvalidUserException()
        }

        let result          = await collectionModel.getById({ _id : payload.collectionId }); 

        if (underscore.isEmpty(result)) {
            throw new exception.CollectionNotFoundException()
        }

        return result
    }
    catch(error) {
        throw error 
    }
}


exports.updateCollection    = async(requestId, payload) => {
    try {                
        let checkUser       = await userModel.getById({ _id : payload.id }); 
        
        if (underscore.isEmpty(checkUser)) {
            throw new exception.InvalidUserException()
        }

        let result          = await collectionModel.getById({ _id : payload.collectionId }); 

        if (underscore.isEmpty(result)) {
            throw new exception.CollectionNotFoundException()
        }

        await collectionModel.updateById(payload.collectionId, { name  : payload.name });

        result.name         = payload.name;

        return result
    }
    catch(error) {
        throw error 
    }
}

exports.addRecommendationToCollection    = async(requestId, tokenData, requestParams, requestBody) => {
    try {                        
        let checkUser       = await userModel.getById({ _id : tokenData.id }); 
        
        if (underscore.isEmpty(checkUser)) {
            throw new exception.InvalidUserException()
        }

        let collection      = await collectionModel.getByConditions({userId : tokenData.id, _id : requestParams.collectionId}); 
        
        collection          = underscore.first(collection)

        if (underscore.isEmpty(collection)) {
            throw new exception.CollectionNotFoundException()
        }

        if (!Array.isArray(collection.recommendationIds)) {
            collection.recommendationIds = [];
        }

        let recommendationIds   = requestBody.recommendationIds;

        let validRecommendations= await recommendationModel.find({ _id: { $in: recommendationIds } });    
    
        if (underscore.isEmpty(validRecommendations)) {
            throw new exception.CollectionRecommendationNotFoundException();
        }

        let validRecommendationIds = validRecommendations.map(rec => rec._id);

        let newRecommendations = validRecommendationIds.filter(id => !collection.recommendationIds.includes(id));

        if (!newRecommendations.length) {
            throw new exception.RecommendationAlreadyExistsException();
        }        

        await collectionModel.updateById(collection._id, {
            $addToSet   : { recommendationIds: { $each: newRecommendations } },
            updatedAt   : new Date()
        });

        return collection._id
    }
    catch(error) {
        throw error 
    }
}



exports.deleteCollection    = async(requestId, tokenData, requestParams) => {
    try {              
        let checkUser       = await userModel.getById({ _id : tokenData.id }); 
        
        if (underscore.isEmpty(checkUser)) {
            throw new exception.InvalidUserException()
        }

        let result          = await collectionModel.getById({ _id : requestParams.collectionId }); 
        
        if (underscore.isEmpty(result)) {
            throw new exception.CollectionNotFoundException()
        }

        await collectionModel.model.deleteOne({ _id: requestParams.collectionId });

        return true
    }
    catch(error) {
        throw error 
    }
}