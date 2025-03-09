require(process.cwd() + "/__test__/app");
const constant      = require(__basePath + "app/config/constant");
const underscore    = require("underscore");
const exception     = require(constant.path.app + "core/exception");
const validation    = require(constant.path.moduleV1 + "user/validation");
const mock          = require(constant.path.test + "module/controller/v1/user/mock.json");

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

describe("User Validation Tests", () => {
    let mockData    = mock["user.validation.sign-up"];

    describe("Sign Up Validation", () => {
        it(mockData.tests.VALIDATION_FNAME_EMPTY.label, async () => {
            let testMockData    = mockData.tests.VALIDATION_FNAME_EMPTY;
            let req     = mockRequest({
                params  : underscore.extend({}, mockData.params, testMockData.params || {}),
                headers : underscore.extend({}, mockData.headers, testMockData.headers || {}),
                body    : underscore.extend({}, mockData.body, testMockData.body || {}),
                query   : underscore.extend({}, mockData.query, testMockData.query || {}),
            });

            let res     = mockResponse();
            await validation.signUp(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("fname");
        });
    });

    describe("Login Validation", () => {
        let mockData        = mock["user.validation.login"];

        it(mockData.tests.VALIDATION_PASSWORD_EMPTY.label, async () => {
            let testMockData= mockData.tests.VALIDATION_PASSWORD_EMPTY;
            let req         = mockRequest({
                params      : underscore.extend({}, mockData.params, testMockData.params || {}),
                headers     : underscore.extend({}, mockData.headers, testMockData.headers || {}),
                body        : underscore.extend({}, mockData.body, testMockData.body || {}),
                query       : underscore.extend({}, mockData.query, testMockData.query || {}),
            });

            let res         = mockResponse();
            await validation.login(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("password");
        });
    });

    describe("Forgot Password Validation", () => {
        let mockData        = mock["user.validation.forgot-password"];

        it(mockData.tests.VALIDATION_CONFIRM_PASSWORD_MISMATCH.label, async () => {
            let testMockData= mockData.tests.VALIDATION_CONFIRM_PASSWORD_MISMATCH;
            let req         = mockRequest({
                params      : underscore.extend({}, mockData.params, testMockData.params || {}),
                headers     : underscore.extend({}, mockData.headers, testMockData.headers || {}),
                body        : underscore.extend({}, mockData.body, testMockData.body || {}),
                query       : underscore.extend({}, mockData.query, testMockData.query || {}),
            });

            let res         = mockResponse();
            await validation.forgotPassword(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("confirmPassword");
        });
    });

    describe("Reset Password Validation", () => {
        let mockData        = mock["user.validation.reset-password"];

        it(mockData.tests.VALIDATION_OLD_PASSWORD_EMPTY.label, async () => {
            let testMockData= mockData.tests.VALIDATION_OLD_PASSWORD_EMPTY;
            let req         = mockRequest({
                params      : underscore.extend({}, mockData.params, testMockData.params || {}),
                headers     : underscore.extend({}, mockData.headers, testMockData.headers || {}),
                body        : underscore.extend({}, mockData.body, testMockData.body || {}),
                query       : underscore.extend({}, mockData.query, testMockData.query || {}),
            });

            let res         = mockResponse();
            await validation.resetPassword(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            const errorPassedToNext = mockNext.mock.calls[0][0];
            expect(errorPassedToNext).toBeInstanceOf(exception.ValidationErrorException);
            expect(errorPassedToNext.response).toHaveProperty("oldPassword");
        });
    });

    describe("Validation Success Cases", () => {
        let mockData        = mock["user.validation.sign-up"];

        it(mockData.tests.VALIDATION_SUCCESS.label, async () => {
            let testMockData= mockData.tests.VALIDATION_SUCCESS;
            let req         = mockRequest({
                params      : underscore.extend({}, mockData.params, testMockData.params || {}),
                headers     : underscore.extend({}, mockData.headers, testMockData.headers || {}),
                body        : underscore.extend({}, mockData.body, testMockData.body || {}),
                query       : underscore.extend({}, mockData.query, testMockData.query || {}),
            });

            let res         = mockResponse();
            await validation.signUp(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
    });
});