const express = require("express");
const multer = require('multer');
const upload = multer();
const {
  PaintController,
  PaintValidator,
} = require("../controllers");

const { validate } = require("express-validation");

const router = express.Router();

router.post("/",
  // validate(PaintValidator.paintUpdate),
  upload.none(),
  async (req, res) => {
    const paintArray = Object.keys(req.body).map(key => JSON.parse(req.body[key]));
    const response = await PaintController.storePaint({
      hitlineClasses: paintArray
    });
    return res.reply({ data: response });
  }
);

router.get("/",
  async (req, res) => {
    const response = await PaintController.getPaint();
    return res.reply({ data: response });
  }
);

module.exports = router;
