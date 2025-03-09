require(process.cwd() + "/__test__/app");
const constant          = require(__basePath + 'app/config/constant');
const validationHelper  = require(constant.path.app + 'util/validation');
const exception         = require(constant.path.app + 'core/exception');
const underscore        = require('underscore');
const mock              = require(constant.path.test + 'module/controller/v1/recommendation/mock.json');
const validation        = require(constant.path.app + 'module/controller/v1/recommendation/validation');

let mockRequest, mockResponse, mockNext;

beforeEach(() => {
    mockRequest = (req) => ({
        query   : req.query || {},
        headers : req.headers || {},
        body    : req.body || {},
        params  : req.params || {},
    });

    mockNext = jest.fn();
    mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("Recommendation Validation Tests", () => {
    describe("Create Recommendation Validation", () => {
        let mockData = mock["recommendation.validation.createRecommendation"];

        it(mockData.tests.VALIDATION_TITLE_EMPTY.label, async () => {
            let testMockData = mockData.tests.VALIDATION_TITLE_EMPTY;
            let req = mockRequest({
                body: underscore.extend({}, mockData.body, testMockData.body || {}),
            });

            let res = mockResponse();
            await validation.createRecommendation(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("title");
        });

        it(mockData.tests.VALIDATION_CATEGORY_INVALID.label, async () => {
            let testMockData = mockData.tests.VALIDATION_CATEGORY_INVALID;
            let req = mockRequest({
                body: underscore.extend({}, mockData.body, testMockData.body || {}),
            });

            let res = mockResponse();
            await validation.createRecommendation(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("category");
        });

        it(mockData.tests.VALIDATION_SUCCESS.label, async () => {
            let testMockData = mockData.tests.VALIDATION_SUCCESS;
            let req = mockRequest({
                body: underscore.extend({}, mockData.body, testMockData.body || {}),
            });

            let res = mockResponse();
            await validation.createRecommendation(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe("Get All Collection Recommendation Validation", () => {
        let mockData = mock["recommendation.validation.getAllCollectionRecommendation"];

        it(mockData.tests.VALIDATION_AUTHORIZATION_EMPTY.label, async () => {
            let testMockData = mockData.tests.VALIDATION_AUTHORIZATION_EMPTY;
            let req = mockRequest({
                headers: underscore.extend({}, testMockData.headers || {}),
            });

            let res = mockResponse();
            await validation.getAllCollectionRecommendation(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("authorization");
        });

        it(mockData.tests.VALIDATION_SUCCESS.label, async () => {
            let testMockData = mockData.tests.VALIDATION_SUCCESS;
            let req = mockRequest({
                headers: underscore.extend({}, testMockData.headers || {}),
                query: underscore.extend({}, testMockData.query || {}),
            });

            let res = mockResponse();
            await validation.getAllCollectionRecommendation(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe("Delete Recommendation From Collection Validation", () => {
        let mockData = mock["recommendation.validation.deleteRecommendationFromCollection"];

        it(mockData.tests.VALIDATION_RECOMMENDATIONID_INVALID.label, async () => {
            let testMockData = mockData.tests.VALIDATION_RECOMMENDATIONID_INVALID;
            let req = mockRequest({
                params: underscore.extend({}, testMockData.params || {}),
            });

            let res = mockResponse();
            await validation.deleteRecommendationFromCollection(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("recommendationId");
        });

        it(mockData.tests.VALIDATION_SUCCESS.label, async () => {
            let testMockData = mockData.tests.VALIDATION_SUCCESS;
            let req = mockRequest({
                params: underscore.extend({}, testMockData.params || {}),
            });

            let res = mockResponse();
            await validation.deleteRecommendationFromCollection(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
        });
    });
});
