const { ValidationError } = require("express-validation");

module.exports = function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  let joiErrors = [];
  if (err.isJoi || err.hasOwnProperty("errors") || err.name === "MongoError") {
    err.status = 422;
  }
  if (err instanceof ValidationError) {
    console.log(err);
    err.status = 422;
    const errDetails = err.details.body || err.details.params;
    joiErrors = errDetails.map((item) => item.message);
  }

  res.reply({
    message: err.message,
    statusCode: err.status || 400,
    data:
      joiErrors.length > 0
        ? { errors: joiErrors }
        : err.hasOwnProperty("errors")
        ? err.errors
        : err.name === "MongoError"
        ? err
        : err.data,
  });
  next();
};
