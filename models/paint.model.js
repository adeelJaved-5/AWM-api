const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaintModel = new Schema(
  {
    hitlineClasses: Array,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Paint", PaintModel);
