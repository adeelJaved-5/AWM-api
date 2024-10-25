const express = require("express");
const multer = require('multer');
const upload = multer({
  limits: {
    fileSize: 200 * 1024 * 1024, 
  },
});
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
    let paintArray = [];
    try {
      paintArray = Object.keys(req.body).map(key => JSON.parse(req.body[key]));
    } catch (error) {
      console.log('error', error);
      paintArray = [];
    }
    const response = await PaintController.storePaint({
      hitlineClasses: paintArray
    });
    return res.reply({ data: response });
  }
);

router.get("/getPaint/:id",
  async (req, res) => {
    const { id } = req.params;
    const response = await PaintController.getPaint(id);
    return res.reply({ data: response });
  }
);

router.get("/getAllPaintIds",
  async (req, res) => {
    const response = await PaintController.getAllPaintIds();
    return res.reply({ data: response });
  }
);

module.exports = router;
