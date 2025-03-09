const constant      = require(__basePath + 'app/config/constant');
const router        = require('express').Router({
    caseSensitive   : true,
    strict          : true
});

const controller    = require(constant.path.moduleV1 + 'user/controller');
const validation    = require(constant.path.moduleV1 + 'user/validation');


module.exports      = (app) => {

/**
 * @swagger
 * /user/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *                 example: "Lokesh2"
 *               email:
 *                 type: string
 *                 example: "lokesh@example.com"
 *               mobileNo:
 *                 type: string
 *                 example: "9571963688"
 *               password:
 *                 type: string
 *                 example: "Paisa@123"
 *               confirmPassword:
 *                 type: string
 *                 example: "Paisa@123"
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "success"
 *                 statusMessage:
 *                   type: string
 *                   example: "Success"
 *                 requestId:
 *                   type: string
 *                   example: "271e8d28-7c3b-44c0-be93-8bc83e37b76f"
 *                 response:
 *                   type: object
 *                   properties:
 *                     fname:
 *                       type: string
 *                       example: "Lokesh2"
 *                     id:
 *                       type: string
 *                       example: "1e281ee2-9fd0-4029-bab5-8a7485ec4891"
 *       401:
 *         description: Validation errors in the request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusMessage:
 *                   type: string
 *                   example: "Validation Error"
 *                 statusCode:
 *                   type: string
 *                   example: "requestParamsNotComplete"
 *                 requestId:
 *                   type: string
 *                   example: "3638ef57-5b15-446f-963f-cd15168bf4dc"
 *                 response:
 *                   type: object
 *                   properties:
 *                     fname:
 *                       type: string
 *                       example: "\"body.fname\" must contain only alphabets"
 *                     email:
 *                       type: string
 *                       example: "\"body.email\" must be a valid email"
 *                     mobileNo:
 *                       type: string
 *                       example: "\"body.mobileNo\" must be a valid 10-digit number"
 *                     password:
 *                       type: string
 *                       example: "\"body.password\" must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
 *                     confirmPassword:
 *                       type: string
 *                       example: "\"body.confirmPassword\" must match 'password'"
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusMessage:
 *                   type: string
 *                   example: "User already exists"
 *                 statusCode:
 *                   type: string
 *                   example: "alreadyExists"
 *                 requestId:
 *                   type: string
 *                   example: "639b6ae5-52fa-4a16-9632-106a5390f394"
 *                 response:
 *                   type: object
 *                   example: {}
 */

    router.post('/sign-up', 
        validation.signUp,
        controller.signUp
    )

    /**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *                 example: "Lokesh2"
 *               password:
 *                 type: string
 *                 example: "Paisa@123"
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "success"
 *                 statusMessage:
 *                   type: string
 *                   example: "Success"
 *                 requestId:
 *                   type: string
 *                   example: "5108c999-6d2f-4825-96a9-6abc5489f485"
 *                 response:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "1e281ee2-9fd0-4029-bab5-8a7485ec4891"
 *                         email:
 *                           type: string
 *                           example: "lokesh@gmail.com"
 *                         fname:
 *                           type: string
 *                           example: "Lokesh2"
 *                         password:
 *                           type: string
 *                           example: "bigahWf2QpKf1wKSyZiVtlKiU+ZGsWNcJeQVnGnp7no="
 *       401:
 *         description: Invalid user credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusMessage:
 *                   type: string
 *                   example: "user is not valid"
 *                 statusCode:
 *                   type: string
 *                   example: "invalidUser"
 *                 requestId:
 *                   type: string
 *                   example: "b974fb42-c3dd-451f-8556-6abac493d26b"
 *                 response:
 *                   type: object
 *                   example: {}
 */

    router.post('/login', 
        validation.login,
        controller.login
    )

/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     summary: Request to reset password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *                 example: "Lokesh2"
 *               password:
 *                 type: string
 *                 example: "NewPaisa@123"
 *     responses:
 *       200:
 *         description: Password reset request successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "success"
 *                 statusMessage:
 *                   type: string
 *                   example: "Password reset successfully"
 *                 requestId:
 *                   type: string
 *                   example: "a1b2c3d4-e5f6-7890-1234-56789abcdef0"
 *                 response:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1e281ee2-9fd0-4029-bab5-8a7485ec4891"
 *                     fname:
 *                       type: string
 *                       example: "Lokesh2"
 *       400:
 *         description: Password already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusMessage:
 *                   type: string
 *                   example: "Password already exists"
 *                 statusCode:
 *                   type: string
 *                   example: "passwordAlreadyExist"
 *                 requestId:
 *                   type: string
 *                   example: "5e6f7g8h-9i0j-1234-5678-9abcdef01234"
 *                 response:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Invalid user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusMessage:
 *                   type: string
 *                   example: "Invalid user"
 *                 statusCode:
 *                   type: string
 *                   example: "invalidUser"
 *                 requestId:
 *                   type: string
 *                   example: "98765abc-def0-1234-5678-9abcdef01234"
 *                 response:
 *                   type: object
 *                   example: {}
 */


    router.post('/forgot-password', 
        validation.forgotPassword,
        controller.forgotPassword
    )

    /**
 * @swagger
 * /user/reset-password:
 *   post:
 *     summary: Reset password for a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *                 example: "Lokesh2"
 *               oldPassword:
 *                 type: string
 *                 example: "OldPaisa@123"
 *               newPassword:
 *                 type: string
 *                 example: "NewPaisa@123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "success"
 *                 statusMessage:
 *                   type: string
 *                   example: "Password updated successfully"
 *                 requestId:
 *                   type: string
 *                   example: "a1b2c3d4-e5f6-7890-1234-56789abcdef0"
 *                 response:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1e281ee2-9fd0-4029-bab5-8a7485ec4891"
 *                     fname:
 *                       type: string
 *                       example: "Lokesh2"
 *       400:
 *         description: Old password does not match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusMessage:
 *                   type: string
 *                   example: "Old password does not match"
 *                 statusCode:
 *                   type: string
 *                   example: "oldPasswordNotExist"
 *                 requestId:
 *                   type: string
 *                   example: "98765abc-def0-1234-5678-9abcdef01234"
 *                 response:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Invalid user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusMessage:
 *                   type: string
 *                   example: "Invalid user"
 *                 statusCode:
 *                   type: string
 *                   example: "invalidUser"
 *                 requestId:
 *                   type: string
 *                   example: "b974fb42-c3dd-451f-8556-6abac493d26b"
 *                 response:
 *                   type: object
 *                   example: {}
 */

    router.post('/reset-password', 
        validation.resetPassword,
        controller.resetPassword
    )

    return {
        router: router
    }
};
