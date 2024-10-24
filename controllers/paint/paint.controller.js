const fs = require('fs');
const path = require('path');

const paintDataPath = path.join(__dirname, 'paintData.json');

const readPaintData = () => {
  if (!fs.existsSync(paintDataPath)) {
    return {};
  }
  try {
    const data = fs.readFileSync(paintDataPath, 'utf-8');
    if (!data) {
      return {};
    }
    return JSON.parse(data);
  } catch (error) {
    console.log('Error parsing JSON data:', error);
    return {}; 
  }
};


const writePaintData = async (data) => {
  try {
    await fs.writeFileSync(paintDataPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.log('Error writing paint data:', error);
    throw new Error(error);
  }
};

exports.storePaint = async ({ id, hitlineClasses }) => {
  try {
    let paintData = await readPaintData();

    paintData[id] = { hitlineClasses };

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
