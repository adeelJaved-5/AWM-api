const express = require("express");
const {
  PaintController,
  PaintValidator,
} = require("../controllers");

const { validate } = require("express-validation");

const router = express.Router();

router.post("/",
  // validate(PaintValidator.paintUpdate),
  async (req, res) => {
    console.log(req.body.hitlineClasses);
    const response = await PaintController.storePaint({
      hitlineClasses: req.body.hitlineClasses
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
