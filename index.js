const express = require("express");
const sequelize = require("./src/db");
const models = require("./src/models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./src/routes/index");
const errorHandler = require("./src/middleware/ErrorHandlingMiddleware");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const listenCb = () => console.log(`Сервер запущен на порту ${PORT}`);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, listenCb);
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = app;
