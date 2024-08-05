const express = require("express");
const PaintRouter = require("./paint.route");

const {
  ErrorMiddleware,
  ResponseMiddleware,
} = require("../middlewares");

const router = express.Router();

router.use(ResponseMiddleware);

router.get("/", (_req, res) => {
  return res.json({
    message: "Backend working as expected",
  });
});

router.use(
  "/paint",
  PaintRouter
);

router.use(ErrorMiddleware);

module.exports = router;
