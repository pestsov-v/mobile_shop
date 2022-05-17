const res = require("express/lib/response");
const ApiError = require("../error/ApiError");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(400).json({ message: "Не предвиденная ошибка" });
};
