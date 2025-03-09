require(process.cwd() + "/__test__/app");
const constant      = require(__basePath + "app/config/constant");
const underscore    = require("underscore");
const exception     = require(constant.path.app + "core/exception");
const validation    = require(constant.path.moduleV1 + "collection/validation");
const mock          = require(constant.path.test + "module/controller/v1/collection/mock.json");

let mockRequest, mockResponse, mockNext;

beforeEach(() => {
    mockRequest     = (req) => ({
        query       : req.query || {},
        headers     : req.headers || {},
        body        : req.body || {},
        params      : req.params || {},
    });

    mockNext        = jest.fn();
    mockResponse    = () => {
        const res   = {};
        res.status  = jest.fn().mockReturnValue(res);
        res.json    = jest.fn().mockReturnValue(res);
        return res;
    };
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("Collection Validation Tests", () => {
    describe("Create Collection Validation", () => {
        let mockData = mock["collection.validation.create"];

        it(mockData.tests.VALIDATION_NAME_EMPTY.label, async () => {
            let testMockData = mockData.tests.VALIDATION_NAME_EMPTY;
            let req = mockRequest({
                body: underscore.extend({}, mockData.body, testMockData.body || {}),
            });

            let res = mockResponse();
            await validation.createCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("name");
        });

        it(mockData.tests.VALIDATION_SUCCESS.label, async () => {
            let testMockData = mockData.tests.VALIDATION_SUCCESS;
            let req = mockRequest({
                body: underscore.extend({}, mockData.body, testMockData.body || {}),
            });

            let res = mockResponse();
            await validation.createCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe("Get All User Collections Validation", () => {
        let mockData = mock["collection.validation.getAllUserCollection"];

        it(mockData.tests.VALIDATION_USERID_INVALID.label, async () => {
            let testMockData = mockData.tests.VALIDATION_USERID_INVALID;
            let req = mockRequest({
                params: underscore.extend({}, mockData.params, testMockData.params || {}),
            });

            let res = mockResponse();
            await validation.getAllUserCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("userId");
        });

        it(mockData.tests.VALIDATION_SUCCESS.label, async () => {
            let testMockData = mockData.tests.VALIDATION_SUCCESS;
            let req = mockRequest({
                params: underscore.extend({}, mockData.params, testMockData.params || {}),
            });

            let res = mockResponse();
            await validation.getAllUserCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe("Get Collection Validation", () => {
        let mockData = mock["collection.validation.get"];

        it(mockData.tests.VALIDATION_COLLECTIONID_INVALID.label, async () => {
            let testMockData = mockData.tests.VALIDATION_COLLECTIONID_INVALID;
            let req = mockRequest({
                params: underscore.extend({}, mockData.params, testMockData.params || {}),
            });

            let res = mockResponse();
            await validation.getCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("collectionId");
        });

        it(mockData.tests.VALIDATION_SUCCESS.label, async () => {
            let testMockData = mockData.tests.VALIDATION_SUCCESS;
            let req = mockRequest({
                params: underscore.extend({}, mockData.params, testMockData.params || {}),
            });

            let res = mockResponse();
            await validation.getCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe("Update Collection Validation", () => {
        let mockData = mock["collection.validation.update"];

        it(mockData.tests.VALIDATION_NAME_EMPTY.label, async () => {
            let testMockData = mockData.tests.VALIDATION_NAME_EMPTY;
            let req = mockRequest({
                body: underscore.extend({}, mockData.body, testMockData.body || {}),
            });

            let res = mockResponse();
            await validation.updateCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("name");
        });

        it(mockData.tests.VALIDATION_SUCCESS.label, async () => {
            let testMockData = mockData.tests.VALIDATION_SUCCESS;
            let req = mockRequest({
                body: underscore.extend({}, mockData.body, testMockData.body || {}),
            });

            let res = mockResponse();
            await validation.updateCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe("Delete Collection Validation", () => {
        let mockData = mock["collection.validation.delete"];

        it(mockData.tests.VALIDATION_COLLECTIONID_INVALID.label, async () => {
            let testMockData = mockData.tests.VALIDATION_COLLECTIONID_INVALID;
            let req = mockRequest({
                params: underscore.extend({}, mockData.params, testMockData.params || {}),
            });

            let res = mockResponse();
            await validation.deleteCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("collectionId");
        });

        it(mockData.tests.VALIDATION_SUCCESS.label, async () => {
            let testMockData = mockData.tests.VALIDATION_SUCCESS;
            let req = mockRequest({
                params: underscore.extend({}, mockData.params, testMockData.params || {}),
            });

            let res = mockResponse();
            await validation.deleteCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe("Add Recommendation to Collection Validation", () => {
        let mockData = mock["collection.validation.addRecommendation"];

        it(mockData.tests.VALIDATION_RECOMMENDATION_EMPTY.label, async () => {
            let testMockData = mockData.tests.VALIDATION_RECOMMENDATION_EMPTY;
            let req = mockRequest({
                body: underscore.extend({}, mockData.body, testMockData.body || {}),
            });

            let res = mockResponse();
            await validation.addRecommendationToCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("recommendationIds");
        });

        it(mockData.tests.VALIDATION_SUCCESS.label, async () => {
            let testMockData = mockData.tests.VALIDATION_SUCCESS;
            let req = mockRequest({
                body: underscore.extend({}, mockData.body, testMockData.body || {}),
            });

            let res = mockResponse();
            await validation.addRecommendationToCollection(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
    });
});
