import { Request, Response } from "express";
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';  

export function getAllCarreteras() {
  return sequelize.query('SELECT * FROM Carreteras', {
    type: QueryTypes.SELECT,  
  });
}

export function getCarreterasByNombre(nombre: string) {
  return sequelize.query(
    'SELECT * FROM Carreteras WHERE Carretera = :nombre',
    {
      replacements: { nombre },
      type: QueryTypes.SELECT,
    }
  );
}

export function getCarreterasByPrioridad(prioridad: number) {
  return sequelize.query(
    'SELECT * FROM Carreteras WHERE Prioridad_Carretera = :prioridad',
    {
      replacements: { prioridad },
      type: QueryTypes.SELECT,
    }
  );
}

export const updateEstadoCarreteras = async (prioridad: number, carretera: string, estadoNombre: string) => {
  console.log("📥 Datos recibidos:", { prioridad, carretera, estadoNombre });

  if (!prioridad || !estadoNombre) {
      throw new Error("❌ Prioridad y estado son obligatorios");
  }

  try {
      // Obtener ID del estado
      const estadoResult: any = await sequelize.query(
          "SELECT Id_Estado FROM Estados WHERE Descripcion_Estado = :estadoNombre",
          { replacements: { estadoNombre }, type: QueryTypes.SELECT }
      );

      if (!estadoResult.length) {
          throw new Error("❌ Estado no encontrado");
      }

      const idEstado = estadoResult[0].Id_Estado;

      // Obtener carreteras
      let queryCarreteras = "SELECT Id_Carretera FROM Carreteras WHERE Prioridad_Carretera = :prioridad";
      let replacementsCarreteras: any = { prioridad };

      if (carretera && carretera !== "TODAS") {
          queryCarreteras += " AND Carretera = :carretera";
          replacementsCarreteras.carretera = carretera;
      }

      const carreterasResult: any = await sequelize.query(queryCarreteras, {
          replacements: replacementsCarreteras,
          type: QueryTypes.SELECT,
      });

      if (!carreterasResult.length) {
          throw new Error("❌ No se encontraron carreteras con la prioridad dada");
      }

      const idCarreteras = carreterasResult.map((row: any) => row.Id_Carretera);

      // Actualizar estado
      await sequelize.query(
          "UPDATE Carreteras SET Estado = :idEstado WHERE Id_Carretera IN (:idCarreteras)",
          { replacements: { idEstado, idCarreteras }, type: QueryTypes.UPDATE }
      );

      console.log("✅ Estado actualizado para carreteras:", idCarreteras);

  } catch (error) {
      console.error("❌ Error en updateEstadoCarreteras:", error);
      throw error;
  }
};

