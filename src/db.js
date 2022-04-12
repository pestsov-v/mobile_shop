const { Sequelize } = require("sequelize");

module.exports = new Sequelize("s_prof", "postgres", "root", {
    dialect: 'postgres',
    host: "localhost",
    port: 5432
});
