const fs = require('fs');
const path = require('path');

const paintDataPath = path.join(__dirname, 'paintData.json');

const readPaintData = () => {
  if (!fs.existsSync(paintDataPath)) {
    return null;
  }

  const data = fs.readFileSync(paintDataPath, 'utf-8');
  return JSON.parse(data);
};

const writePaintData = (data) => {
  fs.writeFileSync(paintDataPath, JSON.stringify(data, null, 2), 'utf-8');
};

exports.storePaint = async ({ hitlineClasses }) => {
  try {
    let paint = readPaintData();

    if (paint) {
      const mergedHitlineClasses = await [...paint.hitlineClasses, ...hitlineClasses];
      paint.hitlineClasses = mergedHitlineClasses;
    } else {
      paint = { hitlineClasses };
    }

    await writePaintData(paint);
    return { status: "success", message: "Paint updated successfully" };
  } catch (error) {
    console.log('An error occurred while updating paint:', error);
    throw new Error(error);
  }
};

exports.getPaint = async () => {
  try {
    const paint = await readPaintData();
    return paint;
  } catch (error) {
    console.log('An error occurred while retrieving paint:', error);
    throw new Error(error);
  }
};
