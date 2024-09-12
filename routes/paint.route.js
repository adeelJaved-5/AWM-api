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
    const response = await PaintController.storePaint({
      id: req.body.id,
      hitlineClasses: req.body.hitlineClasses,
    });
    return res.reply({ data: response });
  }
);

router.get("/:id",
  async (req, res) => {
    const { id } = req.params;
    const response = await PaintController.getPaint(id);
    return res.reply({ data: response });
  }
);

module.exports = router;
