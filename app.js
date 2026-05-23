const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("./utils/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const healthcheckRouter = require("./router/healthcheck.router");
const authRouter = require("./router/auth.router");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(",")
            : "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true
    })
);

app.use("/", healthcheckRouter);
app.use("/api", authRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});