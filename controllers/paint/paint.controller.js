const { PaintModel } = require("../../models");

exports.storePaint = async ({ hitlineClasses }) => {
  try {
    let paint = await PaintModel.findOne();
    if (paint) {
      paint.hitlineClasses = hitlineClasses;
    } else {
      paint = new PaintModel({ hitlineClasses });
    }
    await paint.save();
    return paint;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getPaint = async () => {
  try {
    const paint = await PaintModel.find();
    return paint;
  } catch (error) {
    throw new Error(error);
  }
};
