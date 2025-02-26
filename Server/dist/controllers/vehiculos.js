"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarVehiculoHandler = exports.insertarVehiculoController = exports.eliminarVehiculoHandler = exports.getVehiculosDetalle = exports.obtenerVehiculosPorCampania = exports.getVehiculos = void 0;
const vehiculos_1 = require("../models/vehiculos");
// ✅ Obtener todos los vehículos
const getVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehiculos = yield (0, vehiculos_1.getAllVehiculos)();
        res.status(200).json({
            msg: '✅ Vehículos obtenidos correctamente',
            data: vehiculos,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener vehículos:', error);
        res.status(500).json({
            msg: '❌ Error al obtener vehículos',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getVehiculos = getVehiculos;
/**
 * ✅ Obtener vehículos filtrados por título de campaña
 */
const obtenerVehiculosPorCampania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tituloCampana } = req.query;
        if (!tituloCampana) {
            res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
            return;
        }
        const vehiculos = yield (0, vehiculos_1.getVehiculosPorCampania)(tituloCampana);
        res.status(200).json({
            msg: '✅ Vehículos obtenidos correctamente',
            data: vehiculos,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener vehículos por campaña:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.obtenerVehiculosPorCampania = obtenerVehiculosPorCampania;
// ✅ Obtener todos los vehículos de la última campaña
const getVehiculosDetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehiculos = yield (0, vehiculos_1.getVehiculosUltimaCampania)();
        res.status(200).json({
            msg: '✅ Vehículos obtenidos correctamente',
            data: vehiculos,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener vehículos de la última campaña:', error);
        res.status(500).json({
            msg: '❌ Error al obtener vehículos de la última campaña',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getVehiculosDetalle = getVehiculosDetalle;
const eliminarVehiculoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_vehiculo } = req.params;
        console.log('ID recibido para eliminar en el backend:', id_vehiculo); // Debug
        yield (0, vehiculos_1.eliminarVehiculo)(id_vehiculo);
        res.status(200).json({
            msg: '✅ Vehículo eliminado correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al eliminar vehículo:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.eliminarVehiculoHandler = eliminarVehiculoHandler;
const insertarVehiculoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_vehiculo, descripcion_vehiculo, recurso_vehiculo, empresa_vehiculo, tfno_vehiculo, ext_vehiculo, id_campania_vehiculos } = req.body;
    // Verificar si los datos requeridos están presentes
    if (!id_vehiculo || !descripcion_vehiculo || !recurso_vehiculo || !empresa_vehiculo || !id_campania_vehiculos) {
        res.status(400).json({ msg: '❌ Faltan parámetros necesarios' });
        return;
    }
    try {
        // Llamar al modelo para insertar el vehículo
        yield (0, vehiculos_1.insertarVehiculo)(id_vehiculo, descripcion_vehiculo, recurso_vehiculo, empresa_vehiculo, tfno_vehiculo, ext_vehiculo, id_campania_vehiculos);
        res.status(200).json({
            msg: '✅ Vehículo añadido correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al insertar vehículo:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.insertarVehiculoController = insertarVehiculoController;
// Handler para editar un vehículo
const editarVehiculoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extrae el ID del vehículo desde los parámetros de la URL
    const datos = req.body; // Los datos de la actualización vienen en el cuerpo de la solicitud
    // Asegúrate de que el ID esté presente
    if (!id) {
        res.status(400).json({ msg: '❌ Falta el ID del vehículo a editar' });
        return;
    }
    try {
        // Llama al modelo para realizar la actualización del vehículo
        yield (0, vehiculos_1.editarVehiculo)(id, datos);
        res.status(200).json({ msg: '✅ Registro actualizado correctamente' });
    }
    catch (error) {
        // Maneja los errores de manera apropiada
        if (error instanceof Error) {
            res.status(500).json({ msg: '❌ Error al actualizar el registro', error: error.message });
        }
        else {
            res.status(500).json({ msg: '❌ Error desconocido al actualizar el registro' });
        }
    }
});
exports.editarVehiculoHandler = editarVehiculoHandler;
