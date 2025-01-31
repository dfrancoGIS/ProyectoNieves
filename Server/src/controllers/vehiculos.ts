import { Request, Response } from 'express';
import { getAllVehiculos, getVehiculoById, registrarNuevoVehiculo } from '../models/vehiculos';
import { getLastCampaignId } from '../models/equipos'; // 👈 Importa correctamente la función


// ✅ Obtener todos los vehículos
export const getVehiculos = async (req: Request, res: Response): Promise<void> => {
    try {
        const vehiculos = await getAllVehiculos();
        res.json({ msg: "✅ Vehículos obtenidos correctamente", data: vehiculos });
    } catch (error) {
        console.error("❌ Error al obtener vehículos:", error);
        res.status(500).json({ msg: "❌ Error al obtener vehículos", error });
    }
};

// ✅ Obtener un vehículo por matrícula
export const getVehiculo = async (req: Request, res: Response): Promise<void> => {
    const { matricula } = req.params;
    try {
        const vehiculo = await getVehiculoById(matricula);
        if (!vehiculo.length) {
            res.status(404).json({ msg: "❌ Vehículo no encontrado" });
            return;
        }
        res.json({ msg: "✅ Vehículo encontrado", data: vehiculo[0] });
    } catch (error) {
        console.error("❌ Error al obtener el vehículo:", error);
        res.status(500).json({ msg: "❌ Error al obtener el vehículo", error });
    }
};

// ✅ Insertar un nuevo vehículo
export const registrarVehiculo = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("📥 Datos recibidos en la solicitud:", req.body);

        const { matricula, descripcion, recurso, empresa, telefono } = req.body;

        if (!matricula || !descripcion || !recurso || !empresa || !telefono) {
            res.status(400).json({ msg: "❌ Todos los campos son obligatorios" });
            return;
        }

        // ✅ Obtener la última campaña activa
        const idCampania = await getLastCampaignId();  // 📌 No devuelve un array, sino un número o null

        if (!idCampania) {
            res.status(400).json({ msg: "❌ No hay campañas activas disponibles" });
            return;
        }

        // ✅ Llamar a la función de inserción
        await registrarNuevoVehiculo(matricula, descripcion, recurso, empresa, telefono, idCampania);

        res.json({ msg: "✅ Vehículo registrado correctamente" });
    } catch (error) {
        console.error("❌ Error al registrar el vehículo:", error);
        res.status(500).json({ msg: "❌ Error al registrar el vehículo", error });
    }
};

