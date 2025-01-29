import { Sequelize } from "sequelize";

const sequelize = new Sequelize('NIEVES', 'sa', 'Df8002025', {
    host: 'localhost',
    dialect: 'mssql',
    define: {
        freezeTableName: true
    }
    
  });

export default sequelize;