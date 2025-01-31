import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';  

// ✅ Obtener todos los vehículos
export function getAllVehiculos() {
  return sequelize.query(
    `SELECT Id_Vehiculo, Descripcion_Vehiculo, Recurso_Vehiculo, Empresa_Vehiculo, 
            Tfno_Vehiculo, Ext_Vehiculo, Id_Campania_Vehiculos
     FROM Vehiculos`,
    { type: QueryTypes.SELECT }
  );
}

// ✅ Obtener un vehículo por su ID (Matrícula)
export function getVehiculoById(idVehiculo: string) {
  return sequelize.query(
    `SELECT Id_Vehiculo, Descripcion_Vehiculo, Recurso_Vehiculo, Empresa_Vehiculo, 
            Tfno_Vehiculo, Ext_Vehiculo, Id_Campania_Vehiculos
     FROM Vehiculos 
     WHERE Id_Vehiculo = :idVehiculo`,
    {
      replacements: { idVehiculo },
      type: QueryTypes.SELECT,
    }
  );
}

// ✅ Insertar un nuevo vehículo
export async function registrarNuevoVehiculo(
  idVehiculo: string, 
  descripcion: string, 
  recurso: string, 
  empresa: string, 
  telefono: string, 
  idCampania: number
) {
  return sequelize.query(
    `INSERT INTO Vehiculos (Id_Vehiculo, Descripcion_Vehiculo, Recurso_Vehiculo, 
                            Empresa_Vehiculo, Tfno_Vehiculo, Id_Campania_Vehiculos)
     VALUES (:idVehiculo, :descripcion, :recurso, :empresa, :telefono, :idCampania)`,
    {
      replacements: { idVehiculo, descripcion, recurso, empresa, telefono, idCampania },
      type: QueryTypes.INSERT,
    }
  );
}
