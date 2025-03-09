const constant              = require(__basePath + '/app/config/constant');
const response              = require(constant.path.app + 'util/response');
const { 
    writeLogInfo, 
    writeLogError 
}                           = require(constant.path.app + 'core/logger');
const helper                = require(constant.path.moduleV1 + 'recommendation/helper');

exports.createRecommendation= async (req, res, next) => {
    let requestId           = req.requestId;
    try {
        writeLogInfo([ requestId, ' [recommendationController][createRecommendation][called] ' ]);

        let responseBody    = await helper.createRecommendation(requestId, req.tokenData, req.body)

        writeLogInfo([ requestId, ' [recommendationController][createRecommendation][success] ' ]);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [recommendationController][createRecommendation][failed] ', error ]);
        return next(error)
    }
}

exports.getAllCollectionRecommendation= async (req, res, next) => {
    let requestId           = req.requestId;
    try {
        writeLogInfo([ requestId, ' [recommendationController][getAllCollectionRecommendation][called] ' ]);

        let responseBody    = await helper.getAllCollectionRecommendation(requestId, req.tokenData, req.query)

        writeLogInfo([ requestId, ' [recommendationController][getAllCollectionRecommendation][success] ' ]);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [recommendationController][getAllCollectionRecommendation][failed] ', error ]);
        return next(error)
    }
}


exports.deleteRecommendationFromCollection= async (req, res, next) => {
    let requestId           = req.requestId;
    try {
        writeLogInfo([ requestId, ' [recommendationController][deleteRecommendationFromCollection][called] ' ]);

        let responseBody    = await helper.deleteRecommendationFromCollection(requestId, req.tokenData, req.params)

        writeLogInfo([ requestId, ' [recommendationController][deleteRecommendationFromCollection][success] ' ]);

        return res.status(200).json(response.build(requestId, 'SUCCESS', responseBody)) 
    }
    catch (error) {
        writeLogError([ requestId, ' [recommendationController][deleteRecommendationFromCollection][failed] ', error ]);
        return next(error)
    }
}