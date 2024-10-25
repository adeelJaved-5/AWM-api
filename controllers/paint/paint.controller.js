const fs = require('fs');
const path = require('path');

const paintDataPath = path.join(__dirname, 'paintData.json');

const readPaintData = async () => {
  try {
    if (!await fs.promises.access(paintDataPath, fs.constants.F_OK).then(() => true).catch(() => false)) {
      return {};
    }
    const data = await fs.promises.readFile(paintDataPath, 'utf-8');
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.log('Error parsing JSON data:', error);
    return {};
  }
};

const writePaintData = async (data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.promises.writeFile(paintDataPath, jsonData, 'utf-8');
  } catch (error) {
    console.log('Error writing paint data:', error);
    throw new Error(error);
  }
};

exports.storePaint = async ({ hitlineClasses }) => {
  try {
    let paintData = await readPaintData();

    if (paintData) {
      const mergedHitlineClasses = [...new Set([...paintData.hitlineClasses, ...hitlineClasses])];
      paintData.hitlineClasses = mergedHitlineClasses;
    } else {
      paintData = { hitlineClasses };
    }

    await writePaintData(paintData);

    return { status: "success", message: "Paint updated successfully" };
  } catch (error) {
    console.log('An error occurred while updating paint:', error);
    throw new Error(error);
  }
};

exports.getPaint = async (id) => {
  try {
    const paintData = await readPaintData();
    return paintData;
  } catch (error) {
    console.log('An error occurred while retrieving paint:', error);
    throw new Error(error);
  }
};

