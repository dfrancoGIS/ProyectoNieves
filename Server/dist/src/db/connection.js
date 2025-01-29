"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('NIEVES', 'sa', 'Df8002025', {
    host: 'localhost',
    dialect: 'mssql',
    define: {
        freezeTableName: true
    }
});
exports.default = sequelize;
