const constant              = require(__basePath + '/app/config/constant');
const response              = require(constant.path.app + 'util/response');
const { 
    writeLogInfo, 
    writeLogError 
}                           = require(constant.path.app + 'core/logger');
const helper                = require(constant.path.moduleV1 + 'collection/helper');

exports.createCollection    = async (req, res, next) => {
    let requestId           = req.requestId;
    try {        
        writeLogInfo([ requestId, ' [collectionController][createCollection][called] ' ]);

        let responseBody    = await helper.createCollection(requestId, {...req.body, ...req.tokenData})

        writeLogInfo([ requestId, ' [collectionController][createCollection][success] ']);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [collectionController][createCollection][failed] ', error ]);
        return next(error)
    }
}

exports.getAllUserCollection= async (req, res, next) => {
    let requestId           = req.requestId;
    try {        
        writeLogInfo([ requestId, ' [collectionController][getAllUserCollection][called] ' ]);

        let responseBody    = await helper.getAllUserCollection(requestId, req.tokenData, req.params, req.query)

        writeLogInfo([ requestId, ' [collectionController][getAllUserCollection][success] ']);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [collectionController][getAllUserCollection][failed] ', error ]);
        return next(error)
    }
}

exports.getCollection       = async (req, res, next) => {
    let requestId           = req.requestId;
    try {        
        writeLogInfo([ requestId, ' [collectionController][getCollection][called] ' ]);

        let responseBody    = await helper.getCollection(requestId, {...req.params, ...req.tokenData})

        writeLogInfo([ requestId, ' [collectionController][getCollection][success] ']);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [collectionController][getCollection][failed] ', error ]);
        return next(error)
    }
}

exports.updateCollection    = async (req, res, next) => {
    let requestId           = req.requestId;
    try {        
        writeLogInfo([ requestId, ' [collectionController][updateCollection][called] ' ]);

        let responseBody    = await helper.updateCollection(requestId, {...req.params, ...req.body, ...req.tokenData})

        writeLogInfo([ requestId, ' [collectionController][updateCollection][success] ' ]);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [collectionController][updateCollection][failed] ', error ]);
        return next(error)
    }
}



exports.addRecommendationToCollection    = async (req, res, next) => {
    let requestId           = req.requestId;
    try {        
        writeLogInfo([ requestId, ' [collectionController][addRecommendationToCollection][called] ' ]);

        let responseBody    = await helper.addRecommendationToCollection(requestId, req.tokenData, req.params, req.body)

        writeLogInfo([ requestId, ' [collectionController][addRecommendationToCollection][success] ' ]);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [collectionController][addRecommendationToCollection][failed] ', error ]);
        return next(error)
    }
}



exports.deleteCollection    = async (req, res, next) => {
    let requestId           = req.requestId;
    try {        
        writeLogInfo([ requestId, ' [collectionController][deleteCollection][called] ' ]);

        let responseBody    = await helper.deleteCollection(requestId, req.tokenData, req.params)

        writeLogInfo([ requestId, ' [collectionController][deleteCollection][success] ' ]);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [collectionController][deleteCollection][failed] ', error ]);
        return next(error)
    }
}