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
    data = await JSON.stringify(data, null, 2)
    await fs.promises.writeFile(paintDataPath, data, 'utf-8');
  } catch (error) {
    console.log('Error writing paint data:', error);
    throw new Error(error);
  }
};

exports.storePaint = async ({ id, hitlineClasses }) => {
  try {
    let paintData = await readPaintData();

    paintData[id] = { hitlineClasses };
    console.log(paintData);

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

    if (paintData[id]) {
      return paintData[id];
    } else {
      return { status: "error", message: "No paint found for the given ID" };
    }
  } catch (error) {
    console.log('An error occurred while retrieving paint:', error);
    throw new Error(error);
  }
};

exports.getAllPaintIds = async () => {
  try {
    const paintData = await readPaintData();

    return Object.keys(paintData);
  } catch (error) {
    console.log('An error occurred while retrieving all paint ids:', error);
    throw new Error(error);
  }
};
