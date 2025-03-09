const constant          = require(__basePath + '/app/config/constant');
const underscore        = require('underscore');
const config                = require(constant.path.app + 'core/configuration');
const { 
    writeLogInfo, 
    writeLogError 
}                       = require(constant.path.app + 'core/logger');
const PasswordService   = require('./passwordService');
const TokenService      = require('./tokenService');
const userModel         = require(constant.path.app + 'module/model/mongo/userModel');
const exception         = require(constant.path.app + 'core/exception');
const securityConfig    = config.get('security:userAuth');
const moment            = require('moment');


class AuthService {

    static async signUp(requestId, payload) {
        writeLogInfo([ requestId, ' [AuthService][signUp][called] ' ]);

        let existingUser    = await userModel.getByName({ fname : payload.fname });

        if (underscore.isEmpty(existingUser) === false) {
            writeLogError([ requestId, ' [AuthService][signUp][failed] - AlreadyExistsException' ]);
            throw new exception.AlreadyExistsException()
        }

        const hashedPassword    = await PasswordService.hashPassword(payload.password);

        let signUpPayload       = {
            fname               : payload.fname,
            email               : payload.email,
            mobileNo            : payload.mobileNo,
            password            : hashedPassword
        }

        // saving user data in to db
        let result              = await userModel.insertOne(signUpPayload);

        writeLogInfo([ requestId, ' [AuthService][signUp][success] ' ]);

        return underscore.pick(result, 'fname', 'id')
    }

    static async login(requestId, payload) {
        writeLogInfo([ requestId, ' [AuthService][login][called] ' ]);

        let user        = await userModel.getByName({ fname : payload.fname });        

        if (underscore.isEmpty(user) === true) {
            writeLogError([ requestId, ' [AuthService][login][failed] - InvalidUserException' ]);
            throw new exception.InvalidUserException()
        }

        const hashedPassword   = await PasswordService.hashPassword(payload.password, user.password);        

        if (user.password !== hashedPassword) {
            writeLogError([ requestId, ' [AuthService][login][failed] - PasswordMismatchException' ]);
            throw new exception.PasswordMismatchException()
        }

        let tokenPayload    = underscore.pick(user, 'id', 'email', 'fname', 'password');

        const token         = TokenService.generateAuthToken(tokenPayload, securityConfig.secret, { expiresIn : moment.duration(securityConfig.tokenLife, 'minutes').asSeconds() });

        writeLogInfo([ requestId, ' [AuthService][login][success] ' ]);

        return { token, user : tokenPayload };
    }

    static async forgotPassword(requestId, payload) {
        let user                = await userModel.getByName({ fname : payload.fname });        

        if (underscore.isEmpty(user) === true) {
            writeLogError([ requestId, ' [AuthService][forgotPassword][failed] - InvalidUserException' ]);
            throw new exception.InvalidUserException()
        }

        const hashedPassword    = await PasswordService.hashPassword(payload.password);

        if (hashedPassword === user.password) {
            writeLogError([ requestId, ' [AuthService][forgotPassword][failed] - PasswordAlreadyExistException' ]);
            throw new exception.PasswordAlreadyExistException()
        }

        await userModel.updateById(user.id, { password : hashedPassword });

        return underscore.pick(user, 'id', 'fname')

    }

    static async resetPassword(requestId, payload) {
        let user                = await userModel.getByName({ fname : payload.fname });        

        if (underscore.isEmpty(user) === true) {
            writeLogError([ requestId, ' [AuthService][resetPassword][failed] - InvalidUserException' ]);
            throw new exception.InvalidUserException()
        }

        const oldHashedPassword = await PasswordService.hashPassword(payload.oldPassword);

        if (oldHashedPassword !== user.password) {
            writeLogError([ requestId, ' [AuthService][resetPassword][failed] - oldPasswordNotExistException' ]);
            throw new exception.oldPasswordNotExistException()
        }

        const newHashedPassword = await PasswordService.hashPassword(payload.newPassword);

        await userModel.updateById(user.id, { password : newHashedPassword });

        return underscore.pick(user, 'id', 'fname')
    }
}

module.exports = AuthService;
