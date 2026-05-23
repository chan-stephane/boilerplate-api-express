const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BOILERPLATE API EXPRESS -  API",
            version: "0.0.1",
            description: "API documentation for BOILERPLATE API EXPRESS",
        },
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "x-access-token", // Name of the cookie containing the session token
                },
            },
        },
        security: [
            {
                cookieAuth: [],
            },
        ],
    },
    apis: ["./router/*.js"], // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
