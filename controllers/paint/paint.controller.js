const fs = require('fs');
const path = require('path');

const paintDataPath = path.join(__dirname, 'paintData.json');

const readPaintData = async () => {
  try {
    const exists = await fs.promises.access(paintDataPath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
      
    if (!exists) {
      return {};
    }
    
    const data = await fs.promises.readFile(paintDataPath, 'utf-8');
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error parsing JSON data:', error);
    return {};
  }
};

const writePaintData = async (data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.promises.writeFile(paintDataPath, jsonData, 'utf-8');
  } catch (error) {
    console.error('Error writing paint data:', error);
    throw new Error('Failed to write data');
  }
};

exports.storePaint = async ({ hitlineClasses }) => {
  if (!Array.isArray(hitlineClasses)) {
    throw new Error("Invalid data format: 'hitlineClasses' should be an array.");
  }

  try {
    let paintData = await readPaintData();
    paintData.hitlineClasses = [...new Set([...(paintData.hitlineClasses || []), ...hitlineClasses])];
    await writePaintData(paintData);
    
    return { status: "success", message: "Paint updated successfully" };
  } catch (error) {
    console.error('An error occurred while updating paint:', error);
    throw new Error('Update failed');
  }
};

exports.getPaint = async () => {
  try {
    return await readPaintData();
  } catch (error) {
    console.error('An error occurred while retrieving paint:', error);
    throw new Error('Failed to retrieve paint data');
  }
};
