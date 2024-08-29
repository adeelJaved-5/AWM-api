const fs = require('fs').promises;
const path = require('path');

const paintDataPath = path.join(__dirname, 'paintData.json');

const readPaintData = async () => {
  try {
    await fs.access(paintDataPath); // Check if the file exists
    const data = await fs.readFileSync(paintDataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the error is due to the file not existing, return null; otherwise, throw the error
    if (error.code === 'ENOENT') {
      return null;
    } else {
      throw error;
    }
  }
};

const writePaintData = async (data) => {
  try {
    await fs.writeFileSync(paintDataPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    throw error;
  }
};

exports.storePaint = async ({ hitlineClasses }) => {
  try {
    let paint = await readPaintData();

    if (paint) {
      const mergedHitlineClasses = [...new Set([...paint.hitlineClasses, ...hitlineClasses])];
      paint.hitlineClasses = mergedHitlineClasses;
    } else {
      paint = { hitlineClasses };
    }

    await writePaintData(paint);
    return { status: "success", message: "Paint updated successfully" };
  } catch (error) {
    console.log('An error occurred while updating paint:', error);
    throw new Error('An error occurred while updating paint');
  }
};

exports.getPaint = async () => {
  try {
    const paint = await readPaintData();
    return paint;
  } catch (error) {
    console.log('An error occurred while retrieving paint:', error);
    throw new Error('An error occurred while retrieving paint');
  }
};
