import { Request, Response } from "express";
import { getAllEstados } from "../models/estados";

// ✅ Controlador para obtener todos los estados
export const getEstados = async (req: Request, res: Response): Promise<void> => {
    try {
        const estados = await getAllEstados();

        // 📌 Formatear la respuesta para relacionar nombre y número
        const estadosMap = estados.map((estado: any) => ({
            id: estado.Id_Estado,
            nombre: estado.Descripcion_Estado
        }));

        res.json({ msg: "✅ Estados obtenidos correctamente", data: estadosMap });
    } catch (error) {
        console.error("❌ Error al obtener estados:", error);
        res.status(500).json({ msg: "❌ Error al obtener estados", error });
    }
};
