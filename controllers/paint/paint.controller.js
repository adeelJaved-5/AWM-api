const { PaintModel } = require("../../models");

exports.storePaint = async ({ hitlineClasses }) => {
  try {
    // let paint = await PaintModel.findOne();
    // if (paint) {
    //   const mergedHitlineClasses = await [...paint.hitlineClasses, ...hitlineClasses];
    //   console.log(mergedHitlineClasses.length);
    //   await PaintModel.findOneAndUpdate(
    //     { _id: paint._id },
    //     { $set: { hitlineClasses: mergedHitlineClasses } },
    //     { new: true }
    //   );
    // } else {
    //  new PaintModel({ hitlineClasses });
    //   await paint.save();
    // }
    const paint = await PaintModel.findOne({}, '_id');

    if (paint) {
      await PaintModel.updateOne(
        { _id: paint._id },
        { $addToSet: { hitlineClasses: { $each: hitlineClasses } } }
      );
    } else {
      const newPaint = new PaintModel({ hitlineClasses });
      await newPaint.save();
    }
    return { status: "success", message: "Paint updated successfully" };
  } catch (error) {
    console.log('An error occurred while updating paint:', error);
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
