const { PaintModel } = require("../../models");

const storePaint = async ({ hitlineClasses }) => {
  try {
    console.log(hitlineClasses);
    let paint = await PaintModel.findOne();
    if (paint) {
      paint.hitlineClasses = hitlineClasses;
    } else {
      paint = new PaintModel({ hitlineClasses });
    }
    await paint.save();
    return paint;
  } catch (error) {
    if (error.name === 'VersionError') {
      // Retry mechanism
      let paint = await PaintModel.findOne();
      if (paint) {
        paint.hitlineClasses = hitlineClasses;
      } else {
        paint = new PaintModel({ hitlineClasses });
      }
      await paint.save();
      return paint;
    }
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
