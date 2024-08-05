require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");
// var https = require("https");
// var fs = require("fs");

const { MONGO_URL, PORT } = require("./keys");

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL);

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));
app.use(logger("dev"));
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/", require("./routes"));

// var options = {
// 	key: fs.readFileSync('/var/www/privkey.pem'),
// 	cert: fs.readFileSync('/var/www/fullchain.pem'),
// };

app.listen(PORT, () => {
  console.log(`Started listening at port ${PORT}`);
});
// https.createServer(options, app).listen(3000);
