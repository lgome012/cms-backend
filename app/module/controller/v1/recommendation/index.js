const constant      = require(__basePath + 'app/config/constant');
const router        = require('express').Router({
    caseSensitive   : true,
    strict          : true
});

const controller    = require(constant.path.moduleV1 + 'recommendation/controller');
const validation    = require(constant.path.moduleV1 + 'recommendation/validation');

module.exports      = (app) => {

/**
 * @swagger
 * /recommendation:
 *   post:
 *     summary: Add a recommendation to a collection
 *     tags: [Recommendations]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               collectionId:
 *                 type: string
 *                 format: uuid
 *                 example: "f5ae3a0a-eace-47cf-bcab-bbcb511120ed"
 *               recommendation:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   category:
 *                     type: string
 *                     enum: ["Books", "Movies", "Music", "Games"]
 *                     example: "Books"
 *                   meta:
 *                     type: object
 *                     additionalProperties: true
 *                     example: {"author": "James Clear", "year": 2018}
 *     responses:
 *       201:
 *         description: Recommendation added successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: "success"
 *               statusMessage: "Success"
 *               requestId: "18dc550e-6594-4343-8999-8500775b53f7"
 *               response:
 *                 - title: "Atomic Habits"
 *                   category: "Music"
 *                   meta: {"author": "James Clear", "year": 2018}
 *                   createdBy: "lokesh@gmail.com"
 *                   updatedBy: "lokesh@gmail.com"
 *                   _id: "28458680-a0d4-498f-b011-3d74cfd0fe25"
 *                   createdAt: "2025-03-09T02:41:13.622Z"
 *                   updatedAt: "2025-03-09T02:41:13.622Z"
 *                   id: "28458680-a0d4-498f-b011-3d74cfd0fe25"
 *       400:
 *         description: Validation error or duplicate recommendation
 *         content:
 *           application/json:
 *             examples:
 *               validationError:
 *                 value:
 *                   status: false
 *                   statusMessage: "Validation Error"
 *                   statusCode: "requestParamsNotComplete"
 *                   requestId: "fba65edb-973b-4df8-b6d2-99e7f4feeee3"
 *                   response:
 *                     category: "'body.collections[0].category' must be one of [Books, Movies, Music, Games]"
 *               duplicateRecommendation:
 *                 value:
 *                   status: false
 *                   statusMessage: "collection with name already exists"
 *                   statusCode: "recommendationAlreadyExist"
 *                   requestId: "4911864d-a0d8-4348-9efe-31ffe33b31e7"
 *                   response: {}
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusMessage: "Authentication Failed"
 *               statusCode: "authenticationError"
 *               requestId: "111e9696-ad8b-4062-bd49-fcaf27647b05"
 *               response: {}
 */

    router.post('/', 
        validation.createRecommendation,
        controller.createRecommendation
    )


/**
 * @swagger
 * /recommendation:
 *   get:
 *     summary: Get recommendations by category with pagination
 *     tags: [Recommendations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of items per page (default is 20, max 50)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter recommendations by category (e.g., Books, Movies, Music)
 *     responses:
 *       200:
 *         description: Successful response with a list of recommendations
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: "success"
 *               statusMessage: "Success"
 *               requestId: "6495b1cc-acec-4328-b8c6-54815e915d7c"
 *               response:
 *                 totalCount: 4
 *                 list:
 *                   - _id: "05e82bf1-80de-44dc-a09f-59c196f015c2"
 *                     title: "The Lean Startup"
 *                     category: "Books"
 *                     meta: {"author": "Eric Ries", "year": 2011}
 *                     createdBy: "lokesh@gmail.com"
 *                     updatedBy: "lokesh@gmail.com"
 *                     createdAt: "2025-03-09T02:58:49.311Z"
 *                     updatedAt: "2025-03-09T02:58:49.311Z"
 *                     id: "05e82bf1-80de-44dc-a09f-59c196f015c2"
 *                   - _id: "71535633-af0c-468d-a4c8-1e80044be271"
 *                     title: "Inception"
 *                     category: "Movies"
 *                     meta: {"director": "Christopher Nolan", "year": 2010}
 *                     createdBy: "lokesh@gmail.com"
 *                     updatedBy: "lokesh@gmail.com"
 *                     createdAt: "2025-03-09T02:58:49.311Z"
 *                     updatedAt: "2025-03-09T02:58:49.311Z"
 *                     id: "71535633-af0c-468d-a4c8-1e80044be271"
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: "invalidRequest"
 *               statusMessage: "Invalid query parameters"
 *               requestId: "a19fa02d-6170-4a5f-87cd-af8fa8d82761"
 *               response: {}
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: "authenticationError"
 *               statusMessage: "User is not valid"
 *               requestId: "a19fa02d-6170-4a5f-87cd-af8fa8d82761"
 *               response: {}
 */


    router.get('/', 
        validation.getAllCollectionRecommendation,
        controller.getAllCollectionRecommendation
    )

    /**
 * @swagger
 * /recommendation/{id}:
 *   delete:
 *     summary: Delete a recommendation by ID
 *     tags: [Recommendations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the recommendation to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             collections:
 *               - title: "Books Collection"
 *                 category: "Books"
 *                 recommendations:
 *                   - title: "Atomic Habits"
 *                     meta: { "author": "James Clear", "year": 2018 }
 *                   - title: "The Lean Startup"
 *                     meta: { "author": "Eric Ries", "year": 2011 }
 *               - title: "Movies Collection"
 *                 category: "Movies"
 *                 recommendations:
 *                   - title: "Inception"
 *                     meta: { "director": "Christopher Nolan", "year": 2010 }
 *                   - title: "The Shawshank Redemption"
 *                     meta: { "director": "Frank Darabont", "year": 1994 }
 *     responses:
 *       200:
 *         description: Recommendation successfully deleted
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: "success"
 *               statusMessage: "Success"
 *               requestId: "f20455b0-6c59-4ed6-b730-cce4918f342f"
 *               response: true
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: "invalidRequest"
 *               statusMessage: "Invalid request data"
 *               requestId: "123e4567-e89b-12d3-a456-426614174000"
 *               response: {}
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: "authenticationError"
 *               statusMessage: "User is not authorized"
 *               requestId: "a19fa02d-6170-4a5f-87cd-af8fa8d82761"
 *               response: {}
 *       404:
 *         description: Recommendation not found
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: "collectionRecommendationNotFound"
 *               statusMessage: "No collection Recommendation found"
 *               requestId: "15b422fd-b908-433c-99c7-8ff6a936eb5f"
 *               response: {}
 */


    router.delete('/:recommendationId', 
        validation.deleteRecommendationFromCollection,
        controller.deleteRecommendationFromCollection
    )

    return {
        router: router
    }
    
}