const swaggerJsDoc  = require("swagger-jsdoc");
const swaggerUi     = require("swagger-ui-express");

const options   = {
    definition  : {
        openapi : "3.0.0",
        info    : {
            title       : "CMS API Documentation",
            version     : "1.0.0",
            description : "API Documentation for Collection Management System",
        },
        servers : [
            {
                url         : "http://localhost:3000/cms/api/v1",
                description : "Local server",
            },
        ],
    },
    apis        : ["./app/module/controller/**/*.js"],
};

const swaggerSpec   = swaggerJsDoc(options);

const setupSwagger  = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports      = setupSwagger;
