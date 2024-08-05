const { PaintModel} = require("../../models");

exports.storePaint = async ({ hitlineClasses }) => {
  try {
    const paint = new PaintModel({ hitlineClasses });
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