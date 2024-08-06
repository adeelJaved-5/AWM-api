const { PaintModel } = require("../../models");

exports.storePaint = async ({ hitlineClasses }) => {
  try {
    console.log(hitlineClasses);
    let paint = await PaintModel.findOne();
    if (paint) {
      paint = await PaintModel.findOneAndUpdate(
        { _id: paint._id },
        { $set: { hitlineClasses } },
        { new: true }
      );
    } else {
      paint = new PaintModel({ hitlineClasses });
      await paint.save();
    }
    return paint;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getPaint = async () => {
  try {
    const paint = await PaintModel.findOne();
    return paint;
  } catch (error) {
    throw new Error(error);
  }
};
