const { PaintModel } = require("../../models");

exports.storePaint = async ({ hitlineClasses }) => {
  try {
    let paint = await PaintModel.findOne();
    if (paint) {
      const mergedHitlineClasses = [...paint.hitlineClasses, ...hitlineClasses];
      console.log(mergedHitlineClasses.length);
      await PaintModel.findOneAndUpdate(
        { _id: paint._id },
        { $set: { hitlineClasses: mergedHitlineClasses } },
        { new: true }
      );
    } else {
     new PaintModel({ hitlineClasses });
      await paint.save();
    }
    return {status: "success", message: "Paint updated successfully"};
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
