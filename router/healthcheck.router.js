const controller = require("../controllers/healthcheck.controller");
const router = require("express").Router();

/**
 * @swagger
 * /up:
 *   get:
 *     tags:
 *       - Healthcheck
 *     security: []
 *     operationId: up
 *     summary: Get server status
 *     description: Get server status
 *     responses:
 *       200:
 *         description: Server is up successfully
 */
router.get("/up", controller.up);

module.exports = router;
