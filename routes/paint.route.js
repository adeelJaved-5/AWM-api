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
    console.log(paintArray);
    // const response = await PaintController.storePaint({
    //   hitlineClasses: req.body.hitlineClasses
    // });

    return res.reply({ data: req.body });
  }
);

router.get("/",
  async (req, res) => {
    const response = await PaintController.getPaint();
    return res.reply({ data: response });
  }
);

module.exports = router;
