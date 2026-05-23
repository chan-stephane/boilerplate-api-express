const validator = require("../validators/auth.validator");
const controller = require("../controllers/auth.controller");
const router = require("express").Router();
// const authMiddleware = require("../middleware/auth.middleware");

/**
 * @swagger
 * /api/authenticate:
 *   post:
 *     tags:
 *       - Auth
 *     security: []
 *     operationId: authenticate
 *     summary: Login to an account
 *     description: Login to an account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             title: authenticateRequest
 *             type: object
 *             properties:
 *               email: { type: string, example: "user@gmail.com" }
 *               password: { type: string, example: "user123" }
 *     responses:
 *       200:
 *         description: User Authenticated
 *         content:
 *           application/json:
 *             schema:
 *               title: authenticateResponseSuccess
 *               type: object
 *               properties:
 *                 code: { type: integer, example: 200 }
 *                 status: { type: string, example: "success" }
 *                 message: { type: string, example: "User Authenticated" }
 *                 data: { type: object, example: { user: { name: "User", email: "user@gmail.com" }, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30" } }
 *       400:
 *         description: Something went wrong, Please try again
 *         content:
 *           application/json:
 *             schema:
 *               title: authenticateResponseError
 *               type: object
 *               properties:
 *                 code: { type: integer, example: 400 }
 *                 status: { type: string, example: "error" }
 *                 message: { type: string, example: "Something went wrong, Please try again" }
 *                 data: { type: null, example: null }
 */
router.post("/authenticate", validator.authenticate, controller.authenticate);


router.post(
    "/logout",
    controller.logout
)

module.exports = router;
