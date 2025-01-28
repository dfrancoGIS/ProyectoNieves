import { Sequelize } from 'sequelize';
import * as sql from 'msnodesqlv8';

const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectModule: sql,  // Asegura que se usa el driver correcto
  dialectOptions: {
    options: {
      driver: '{ODBC Driver 17 for SQL Server}',
      server: 'localhost\\SQLEXPRESS',  // Usa tu instancia de SQL Server
      database: 'NIEVES',
      trustedConnection: true,  // Autenticación de Windows
    }
  },
  pool: {
    min: 0,
    max: 5,
    idle: 10000
  }
});

// Probar la conexión
sequelize.authenticate()
  .then(() => console.log('✅ Conexión establecida correctamente a SQL Server'))
  .catch((err: any) => console.error('❌ Error al conectar:', err));

export default sequelize;
