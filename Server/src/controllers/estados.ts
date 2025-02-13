import { Request, Response } from "express";
import { getAllEstados } from "../models/estados";

// ✅ Controlador para obtener todos los estados
export const getEstados = async (req: Request, res: Response): Promise<void> => {
    try {
        const estados = await getAllEstados();

        // Verifica el contenido de los datos obtenidos
        console.log("Datos obtenidos desde la base de datos:", estados);

        const estadosMap = estados.map((estado: any) => ({
            id: estado.id_estado, // Verifica que estas claves existen en los objetos devueltos
            nombre: estado.descripcion_estado, // Verifica que estas claves existen en los objetos devueltos
        }));

        res.json({ msg: "✅ Estados obtenidos correctamente", data: estadosMap });
    } catch (error) {
        console.error("❌ Error al obtener estados:", error);
        res.status(500).json({ msg: "❌ Error al obtener estados", error });
    }
};
