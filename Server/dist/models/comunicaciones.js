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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllComunicaciones = getAllComunicaciones;
exports.getCarreteraIdByNombre = getCarreteraIdByNombre;
exports.getComunicacionById = getComunicacionById;
exports.getNextIdComunicacion = getNextIdComunicacion;
exports.getEquipoIdByRecurso = getEquipoIdByRecurso;
exports.getRecursoIdByNombre = getRecursoIdByNombre;
exports.getZonaIdByNombre = getZonaIdByNombre;
exports.getPKByCarretera = getPKByCarretera;
exports.getTareaIdByDescripcion = getTareaIdByDescripcion;
exports.getEstadoIdByDescripcion = getEstadoIdByDescripcion;
exports.getTenerCtaIdByDescripcion = getTenerCtaIdByDescripcion;
exports.registrarComunicacion = registrarComunicacion;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const equipos_1 = require("./equipos");
/**
 * Obtiene todas las comunicaciones de la última campaña activa.
 */
function getAllComunicaciones() {
    return __awaiter(this, void 0, void 0, function* () {
        const idCampania = yield (0, equipos_1.getLastCampaignId)();
        if (!idCampania) {
            throw new Error("❌ No hay campañas activas.");
        }
        return connection_1.default.query(`SELECT c.Id_Comunicacion, c.Fecha_Hora_Comunicacion, c.Equipo_Comunicacion, e.Recurso_Equipo,
                v.Id_Vehiculo, v.Descripcion_Vehiculo, 
                c.Zona_Comunicacion, z.Orden_Zona, 
                c.Prioridad_Comunicacion, c.Carretera_Comunicacion, 
                c.PK_Inicio_Comunicaciones, c.PK_Fin_Comunicaciones, 
                c.Tarea_Comunicacion, t.Descripcion_Tarea,
                c.Estado_Ctra_Comunicacion, es.Descripcion_Estado, 
                c.Tener_Cta_Comunicacion, tc.Descripcion_Tener_Cta,
                c.Observaciones_Comunicacion
         FROM Comunicaciones c
         LEFT JOIN Equipos e ON c.Equipo_Comunicacion = e.Id_Equipo
         LEFT JOIN Vehiculos v ON e.Vehiculo_Equipo = v.Id_Vehiculo
         LEFT JOIN Zonas z ON c.Zona_Comunicacion = z.Id_Zona
         LEFT JOIN Tareas t ON c.Tarea_Comunicacion = t.Id_Tarea
         LEFT JOIN Estados es ON c.Estado_Ctra_Comunicacion = es.Id_Estado
         LEFT JOIN Tener_Cta tc ON c.Tener_Cta_Comunicacion = tc.Id_Tener_Cta
         WHERE c.Id_Campania_Comunicacion = :idCampania`, {
            replacements: { idCampania },
            type: sequelize_1.QueryTypes.SELECT
        });
    });
}
/**
 * Obtiene el ID de una carretera en base a su nombre.
 */
function getCarreteraIdByNombre(nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const result = yield connection_1.default.query(`SELECT Id_Carretera FROM Carreteras WHERE LTRIM(RTRIM(UPPER(Carretera))) = LTRIM(RTRIM(UPPER(:nombre)))`, { replacements: { nombre }, type: sequelize_1.QueryTypes.SELECT });
        // Log para verificar si se encuentra la carretera
        console.log(`🔎 Buscando ID de carretera para: '${nombre}' → Resultado:`, (_a = result[0]) === null || _a === void 0 ? void 0 : _a.Id_Carretera);
        return ((_b = result[0]) === null || _b === void 0 ? void 0 : _b.Id_Carretera) || null;
    });
}
/**
 * Obtiene una comunicación específica por ID.
 */
function getComunicacionById(idComunicacion) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_1.default.query(`SELECT * FROM Comunicaciones WHERE Id_Comunicacion = :idComunicacion`, {
            replacements: { idComunicacion },
            type: sequelize_1.QueryTypes.SELECT
        });
    });
}
/**
 * Obtiene el siguiente ID de comunicación.
 */
function getNextIdComunicacion() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const result = yield connection_1.default.query(`SELECT MAX(Id_Comunicacion) + 1 AS nextId FROM Comunicaciones`, { type: sequelize_1.QueryTypes.SELECT });
        return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.nextId) || 1;
    });
}
/**
 * Obtiene el ID del equipo en base a su recurso.
 */
function getEquipoIdByRecurso(recurso) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const result = yield connection_1.default.query(`SELECT Id_Equipo FROM Equipos WHERE LTRIM(RTRIM(UPPER(Recurso_Equipo))) = LTRIM(RTRIM(UPPER(:recurso)))`, { replacements: { recurso }, type: sequelize_1.QueryTypes.SELECT });
        return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.Id_Equipo) || null;
    });
}
/**
 * Obtiene el ID del recurso en base a su nombre.
 */
function getRecursoIdByNombre(nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const result = yield connection_1.default.query(`SELECT Id_Recurso FROM Recursos WHERE Empresa_Recurso = :nombre`, { replacements: { nombre }, type: sequelize_1.QueryTypes.SELECT });
        return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.Id_Recurso) || null;
    });
}
/**
 * Obtiene el ID de la zona en base a su nombre.
 */
function getZonaIdByNombre(nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const result = yield connection_1.default.query(`SELECT Id_Zona FROM Zonas WHERE LTRIM(RTRIM(UPPER(Id_Zona))) = LTRIM(RTRIM(UPPER(:nombre)))`, { replacements: { nombre }, type: sequelize_1.QueryTypes.SELECT });
        return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.Id_Zona) || null;
    });
}
/**
 * Obtiene los PK de una carretera en base a su nombre.
 */
function getPKByCarretera(nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield connection_1.default.query(`SELECT PK_Inferior, PK_Superior FROM Carreteras WHERE LTRIM(RTRIM(UPPER(Carretera))) = LTRIM(RTRIM(UPPER(:nombre)))`, { replacements: { nombre }, type: sequelize_1.QueryTypes.SELECT });
        return result[0] || { PK_Inferior: null, PK_Superior: null };
    });
}
/**
 * Obtiene el ID de la tarea en base a su descripción.
 */
function getTareaIdByDescripcion(descripcion) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const result = yield connection_1.default.query(`SELECT Id_Tarea FROM Tareas WHERE Descripcion_Tarea = :descripcion`, { replacements: { descripcion }, type: sequelize_1.QueryTypes.SELECT });
        return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.Id_Tarea) || null;
    });
}
/**
 * Obtiene el ID del estado en base a su descripción.
 */
function getEstadoIdByDescripcion(descripcion) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const result = yield connection_1.default.query(`SELECT Id_Estado FROM Estados WHERE Descripcion_Estado = :descripcion`, { replacements: { descripcion }, type: sequelize_1.QueryTypes.SELECT });
        return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.Id_Estado) || null;
    });
}
/**
 * Obtiene el ID de "Tener en cuenta" en base a su descripción.
 */
function getTenerCtaIdByDescripcion(descripcion) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const result = yield connection_1.default.query(`SELECT Id_Tener_Cta FROM Tener_Cta WHERE LTRIM(RTRIM(UPPER(Descripcion_Tener_Cta))) = LTRIM(RTRIM(UPPER(:descripcion)))`, { replacements: { descripcion }, type: sequelize_1.QueryTypes.SELECT });
        return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.Id_Tener_Cta) || null;
    });
}
/**
 * Inserta una nueva comunicación en la base de datos.
 */
function registrarComunicacion(equipo, recurso, zona, prioridad, carretera, tarea, estadoCarretera, tenerCta, observaciones) {
    return __awaiter(this, void 0, void 0, function* () {
        const idComunicacion = yield getNextIdComunicacion();
        console.log("🟢 ID de Comunicación generado:", idComunicacion);
        const idEquipo = yield getEquipoIdByRecurso(equipo);
        console.log("🔹 ID de Equipo:", idEquipo);
        const idRecurso = yield getRecursoIdByNombre(recurso);
        console.log("🔹 ID de Recurso:", idRecurso);
        const idZona = yield getZonaIdByNombre(zona);
        console.log("🔹 ID de Zona:", idZona);
        const { PK_Inferior, PK_Superior } = yield getPKByCarretera(carretera);
        console.log("🔹 PK Inicio:", PK_Inferior, "PK Fin:", PK_Superior);
        const idCarretera = yield getCarreteraIdByNombre(carretera);
        console.log("🔹 ID de Carretera:", idCarretera);
        if (!idCarretera) {
            throw new Error(`❌ Error: No se encontró un ID para la carretera '${carretera}'. Verifica que el nombre es correcto.`);
        }
        const idTarea = yield getTareaIdByDescripcion(tarea);
        console.log("🔹 ID de Tarea:", idTarea);
        const idEstado = yield getEstadoIdByDescripcion(estadoCarretera);
        console.log("🔹 ID de Estado de Carretera:", idEstado);
        const idTenerCta = yield getTenerCtaIdByDescripcion(tenerCta);
        console.log("🔹 ID de Tener en cuenta:", idTenerCta);
        const idCampania = yield (0, equipos_1.getLastCampaignId)();
        console.log("🔹 ID de Campaña:", idCampania);
        // Si alguno es null, mostramos el error específico
        if (!idEquipo || !idRecurso || !idZona || !idTarea || !idEstado || !idTenerCta || !idCampania) {
            throw new Error(`❌ Error: Algunos identificadores no se resolvieron correctamente:
        - idEquipo: ${idEquipo}
        - idRecurso: ${idRecurso}
        - idZona: ${idZona}
        - PK_Inferior: ${PK_Inferior}, PK_Superior: ${PK_Superior}
        - idCarretera: ${idCarretera}
        - idTarea: ${idTarea}
        - idEstado: ${idEstado}
        - idTenerCta: ${idTenerCta}
        - idCampania: ${idCampania}`);
        }
        const fechaHora = new Date().toISOString().slice(0, 19).replace('T', ' '); // Fecha actual en formato SQL
        return yield connection_1.default.query(`INSERT INTO Comunicaciones (Equipo_Comunicacion, Recurso_Comunicacion, Zona_Comunicacion, 
                                     Prioridad_Comunicacion, Carretera_Comunicacion, PK_Inicio_Comunicaciones, 
                                     PK_Fin_Comunicaciones, Tarea_Comunicacion, Estado_Ctra_Comunicacion, 
                                     Tener_Cta_Comunicacion, Observaciones_Comunicacion, Fecha_Hora_Comunicacion, Id_Campania_Comunicacion)
         VALUES (:idEquipo, :idRecurso, :idZona, :prioridad, :idCarretera, :PK_Inferior, :PK_Superior, 
                 :idTarea, :idEstado, :idTenerCta, :observaciones, :fechaHora, :idCampania)`, {
            replacements: {
                idEquipo, idRecurso, idZona, prioridad, idCarretera, PK_Inferior, PK_Superior,
                idTarea, idEstado, idTenerCta, observaciones, fechaHora, idCampania
            },
            type: sequelize_1.QueryTypes.INSERT
        });
    });
}
