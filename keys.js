const keys = {
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/awm",
  PORT: process.env.PORT || 3000,
};

console.log(keys);

module.exports = keys;
