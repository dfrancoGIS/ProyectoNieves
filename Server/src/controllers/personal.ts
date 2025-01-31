import { Request, Response } from 'express';
import { getAllPersonal, registrarNuevoPersonal, actualizarPersonal, eliminarPersonal } from '../models/personal';

/**
 * Controlador para obtener todos los registros de Personal.
 */
export const getPersonal = async (req: Request, res: Response): Promise<void> => {
    try {
        const personal = await getAllPersonal();
        res.status(200).json({
            msg: '✅ Personal obtenido correctamente',
            data: personal,
        });
    } catch (error) {
        console.error('❌ Error al obtener personal:', error);
        res.status(500).json({
            msg: '❌ Error al obtener personal',
            error: error instanceof Error ? error.message : error,
        });
    }
};

/**
 * Controlador para registrar un nuevo personal.
 */
export const registrarPersonal = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("📥 Datos recibidos en la solicitud:", req.body);

        const { nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa } = req.body;

        if (!nombre || !apellido1 || !alias || !ocupacion || !telefono1 || !departamento || dfa === undefined) {
            res.status(400).json({ msg: "❌ Todos los campos obligatorios deben estar presentes" });
            return;
        }

        await registrarNuevoPersonal(nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa);

        res.json({ msg: "✅ Personal registrado correctamente" });
    } catch (error) {
        console.error("❌ Error al registrar el personal:", error);
        res.status(500).json({ msg: "❌ Error al registrar el personal", error });
    }
};

/**
 * Controlador para actualizar un registro de personal.
 */
export const modificarPersonal = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa } = req.body;

        if (!id || !nombre || !apellido1 || !alias || !ocupacion || !telefono1 || !departamento || dfa === undefined) {
            res.status(400).json({ msg: "❌ Todos los campos obligatorios deben estar presentes" });
            return;
        }

        await actualizarPersonal(Number(id), nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa);

        res.json({ msg: "✅ Personal actualizado correctamente" });
    } catch (error) {
        console.error("❌ Error al actualizar el personal:", error);
        res.status(500).json({ msg: "❌ Error al actualizar el personal", error });
    }
};

/**
 * Controlador para eliminar un registro de personal.
 */
export const borrarPersonal = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ msg: "❌ ID del personal es obligatorio" });
            return;
        }

        await eliminarPersonal(Number(id));

        res.json({ msg: "✅ Personal eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar el personal:", error);
        res.status(500).json({ msg: "❌ Error al eliminar el personal", error });
    }
};
