const constant      = require(__basePath + 'app/config/constant');
const router        = require('express').Router({
    caseSensitive   : true,
    strict          : true
});

const controller    = require(constant.path.moduleV1 + 'collection/controller');
const validation    = require(constant.path.moduleV1 + 'collection/validation');
const security      = require(constant.path.app + 'core/security');

module.exports      = (app) => {

/**
 * @swagger
 * /collection:
 *   post:
 *     summary: Create a new collection for the authenticated user
 *     tags: [Collections]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Books"
 *     responses:
 *       201:
 *         description: Collection created successfully
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
 *                   format: uuid
 *                   example: "279d3d69-d3f3-455b-90cd-b82072250d9d"
 *                 response:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Movies"
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       example: "687685e5-b7ea-475a-8969-697c2895f5d6"
 *                     recommendationIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     isDeleted:
 *                       type: boolean
 *                       example: false
 *                     _id:
 *                       type: string
 *                       format: uuid
 *                       example: "f5ae3a0a-eace-47cf-bcab-bbcb511120ed"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T13:49:39.130Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T13:49:39.130Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "f5ae3a0a-eace-47cf-bcab-bbcb511120ed"
 *       400:
 *         description: Collection already exists for this user
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
 *                   example: "collection with name Books already exists for this user"
 *                 statusCode:
 *                   type: string
 *                   example: "userCollectionAlreadyExist"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "fb5a88c7-8b7b-42a6-bc33-21880d4bc94c"
 *                 response:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Invalid user (unauthorized)
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
 *                   format: uuid
 *                   example: "e1ff2aaf-e89e-4478-a0c4-fbc356e5b917"
 *                 response:
 *                   type: object
 *                   example: {}
 */

    router.post('/',
        validation.createCollection,
        controller.createCollection
    )


/**
 * @swagger
 * /collection/user/{userId}:
 *   get:
 *     summary: Get all collections for a user with pagination
 *     tags: [Collections]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "e593acec-0f18-4d92-a1e1-5a9bc697a10a"
 *         description: Unique identifier of the user whose collections need to be fetched
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 20
 *         description: Number of collections per page
 *     responses:
 *       200:
 *         description: Successfully retrieved user collections
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
 *                   format: uuid
 *                   example: "962b1c1d-e62d-410d-af2b-a17929b96e07"
 *                 response:
 *                   type: object
 *                   properties:
 *                     totalCount:
 *                       type: integer
 *                       example: 2
 *                     list:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             example: "f5ae3a0a-eace-47cf-bcab-bbcb511120ed"
 *                           name:
 *                             type: string
 *                             example: "Movies"
 *                           userId:
 *                             type: string
 *                             format: uuid
 *                             example: "687685e5-b7ea-475a-8969-697c2895f5d6"
 *                           recommendationIds:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: []
 *                           isDeleted:
 *                             type: boolean
 *                             example: false
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-03-08T13:49:39.130Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-03-08T13:49:39.130Z"
 *                           __v:
 *                             type: integer
 *                             example: 0
 *       200_empty:
 *         description: User has no collections
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
 *                   format: uuid
 *                   example: "3fd7e4e8-96a3-4d01-873e-106caab342a1"
 *                 response:
 *                   type: object
 *                   properties:
 *                     totalCount:
 *                       type: integer
 *                       example: 0
 *                     list:
 *                       type: array
 *                       items: {}
 *                       example: []
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
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
 *                   example: "Unauthorized"
 *                 statusCode:
 *                   type: string
 *                   example: "unauthorized"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "e1ff2aaf-e89e-4478-a0c4-fbc356e5b917"
 *                 response:
 *                   type: object
 *                   example: {}
 */

    router.get('/user/:userId',
        validation.getAllUserCollection,
        controller.getAllUserCollection
    )


/**
 * @swagger
 * /collection/{collectionId}:
 *   get:
 *     summary: Get a specific collection by its ID
 *     tags: [Collections]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "05b40b44-4572-41ae-bd1e-922b061393fc"
 *         description: Unique identifier of the collection to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the collection
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
 *                   format: uuid
 *                   example: "d54c6a65-70db-4765-8cd4-b385901bb452"
 *                 response:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "05b40b44-4572-41ae-bd1e-922b061393fc"
 *                     name:
 *                       type: string
 *                       example: "Books"
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       example: "687685e5-b7ea-475a-8969-697c2895f5d6"
 *                     recommendationIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: uuid
 *                       example: ["8388a1b2-5b45-4b15-9359-3a2d2f755bac", "fe4f008e-c3e6-4805-80ca-e9e6b1622bb6"]
 *                     isDeleted:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T12:29:55.231Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T13:31:39.833Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       404:
 *         description: Collection not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: string
 *                   example: "collectionNotFound"
 *                 statusMessage:
 *                   type: string
 *                   example: "No collection found"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "764a9f5d-44ef-4512-b53e-f46225a01529"
 *                 response:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
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
 *                   example: "Unauthorized"
 *                 statusCode:
 *                   type: string
 *                   example: "unauthorized"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "e1ff2aaf-e89e-4478-a0c4-fbc356e5b917"
 *                 response:
 *                   type: object
 *                   example: {}
 */


    router.get('/:collectionId',
        validation.getCollection,
        controller.getCollection
    )

/**
 * @swagger
 * /cms/api/v1/collection/{collectionId}:
 *   patch:
 *     summary: Update Collection Name
 *     description: Updates the name of a specific collection by its ID.
 *     tags: [Collections]
 *     security:
 *       - BearerAuth: []  # Requires JWT token authentication
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "b02280ee-b2fa-47eb-abe9-8cbaea2bda83"
 *         description: Unique identifier of the collection to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Movies"
 *                 description: New name for the collection.
 *     responses:
 *       200:
 *         description: Successfully updated the collection name.
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
 *                   format: uuid
 *                   example: "d1bce604-b0fd-4b4f-821e-4d2d559d7c58"
 *                 response:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "05b40b44-4572-41ae-bd1e-922b061393fc"
 *                     name:
 *                       type: string
 *                       example: "Movies"
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       example: "687685e5-b7ea-475a-8969-697c2895f5d6"
 *                     recommendationIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: uuid
 *                       example: ["8388a1b2-5b45-4b15-9359-3a2d2f755bac"]
 *                     isDeleted:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T12:29:55.231Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-08T14:04:42.698Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       404:
 *         description: Collection not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: string
 *                   example: "collectionNotFound"
 *                 statusMessage:
 *                   type: string
 *                   example: "No collection found"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "08c88d4c-b971-4e7d-bb5b-ef934ecc2ebe"
 *                 response:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token.
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
 *                   example: "Unauthorized"
 *                 statusCode:
 *                   type: string
 *                   example: "unauthorized"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "e1ff2aaf-e89e-4478-a0c4-fbc356e5b917"
 *                 response:
 *                   type: object
 *                   example: {}
 */


    router.patch('/:collectionId',
        validation.updateCollection,
        controller.updateCollection
    )

/**
 * @swagger
 * /cms/api/v1/collection/{collectionId}/recommendation:
 *   post:
 *     summary: Add Recommendations to Collection
 *     description: Adds one or more recommendations to a specific collection.
 *     tags: [Collections]
 *     security:
 *       - BearerAuth: []  # Requires JWT authentication
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "05b40b44-4572-41ae-bd1e-922b061393fc"
 *         description: Unique identifier of the collection.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recommendationIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example: ["40ba5f86-6fcd-4521-b29d-d07eb92d7f06"]
 *                 description: List of recommendation IDs to be added.
 *     responses:
 *       200:
 *         description: Successfully added recommendations to the collection.
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
 *                   format: uuid
 *                   example: "73c40c46-3e18-4337-9407-f51d582475f4"
 *                 response:
 *                   type: object
 *                   example: {}
 *       400:
 *         description: Bad request - recommendation already exists in the collection.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: string
 *                   example: "recommendationAlreadyExists"
 *                 statusMessage:
 *                   type: string
 *                   example: "Recommendation already exists in the collection"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "a1b2c3d4-e5f6-7890-1234-56789abcdef0"
 *                 response:
 *                   type: object
 *                   example: {}
 *       404:
 *         description: Collection not found or invalid recommendation IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: string
 *                   example: "collectionNotFound"
 *                 statusMessage:
 *                   type: string
 *                   example: "No collection found"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "08c88d4c-b971-4e7d-bb5b-ef934ecc2ebe"
 *                 response:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: string
 *                   example: "unauthorized"
 *                 statusMessage:
 *                   type: string
 *                   example: "Unauthorized"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "e1ff2aaf-e89e-4478-a0c4-fbc356e5b917"
 *                 response:
 *                   type: object
 *                   example: {}
 *       403:
 *         description: Invalid user - User associated with token not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: string
 *                   example: "invalidUser"
 *                 statusMessage:
 *                   type: string
 *                   example: "Invalid user"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "b7c91a34-df52-4f29-89e0-1723a987d6fe"
 *                 response:
 *                   type: object
 *                   example: {}
 *       422:
 *         description: Invalid recommendations - None of the provided recommendation IDs exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: string
 *                   example: "collectionRecommendationNotFound"
 *                 statusMessage:
 *                   type: string
 *                   example: "No valid recommendations found"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "3cbaef56-89de-4b71-a7f3-25d4829ac2e1"
 *                 response:
 *                   type: object
 *                   example: {}
 */

    router.post('/:collectionId/recommendation',
        validation.addRecommendationToCollection,
        controller.addRecommendationToCollection
    )

    /**
 * @swagger
 * /cms/api/v1/collection/{collectionId}:
 *   delete:
 *     summary: Soft delete a collection
 *     description: Marks a collection as deleted instead of permanently removing it.
 *     tags: [Collections]
 *     security:
 *       - BearerAuth: []  # Requires JWT authentication
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "05b40b44-4572-41ae-bd1e-922b061393fc"
 *         description: Unique identifier of the collection to be deleted.
 *     responses:
 *       200:
 *         description: Collection successfully soft deleted.
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
 *                   format: uuid
 *                   example: "554a5238-588c-46fd-b953-fcf9dc0427d0"
 *                 response:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Validation Error - Invalid Collection ID format.
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
 *                   format: uuid
 *                   example: "4cab7725-ed6f-42f6-8935-0d0b95e9149c"
 *                 response:
 *                   type: object
 *                   properties:
 *                     collectionId:
 *                       type: string
 *                       example: "\"params.collectionId\" must be a valid GUID"
 *       404:
 *         description: Collection not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: string
 *                   example: "collectionNotFound"
 *                 statusMessage:
 *                   type: string
 *                   example: "No collection found"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "8f8196df-a097-43f4-8669-005a5cbe4f09"
 *                 response:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token.
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
 *                   example: "Unauthorized"
 *                 statusCode:
 *                   type: string
 *                   example: "unauthorized"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "fae7b9d1-8c45-46e5-812a-342aef7cd9a5"
 *                 response:
 *                   type: object
 *                   example: {}
 *       403:
 *         description: Forbidden - User does not have permission to delete this collection.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: string
 *                   example: "forbidden"
 *                 statusMessage:
 *                   type: string
 *                   example: "You do not have permission to delete this collection"
 *                 requestId:
 *                   type: string
 *                   format: uuid
 *                   example: "1e28f34b-c92a-44f7-8e9a-5c1db5e4127b"
 *                 response:
 *                   type: object
 *                   example: {}
 */



    router.delete('/:collectionId', 
        validation.deleteCollection,
        controller.deleteCollection
    )


    return {
        router: router
    }
}