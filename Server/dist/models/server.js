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
const express_1 = __importDefault(require("express"));
const equipos_1 = __importDefault(require("../routes/equipos"));
const carreteras_1 = __importDefault(require("../routes/carreteras"));
const comunicaciones_1 = __importDefault(require("../routes/comunicaciones"));
const cuadrillas_1 = __importDefault(require("../routes/cuadrillas"));
const retenes_1 = __importDefault(require("../routes/retenes"));
const vehiculos_1 = __importDefault(require("../routes/vehiculos"));
const estados_1 = __importDefault(require("../routes/estados"));
const zonas_1 = __importDefault(require("../routes/zonas"));
const tareas_1 = __importDefault(require("../routes/tareas"));
const tablasMantenimiento_1 = __importDefault(require("../routes/tablasMantenimiento"));
const recursos_1 = __importDefault(require("../routes/recursos"));
const personal_1 = __importDefault(require("../routes/personal"));
const estadosComunicacion_1 = __importDefault(require("../routes/estadosComunicacion"));
const equipoPersonal_1 = __importDefault(require("../routes/equipoPersonal"));
const carreterasRecursoCuadrilla_1 = __importDefault(require("../routes/carreterasRecursoCuadrilla"));
const tenerCta_1 = __importDefault(require("../routes/tenerCta"));
const stationRoutes_1 = __importDefault(require("../routes/stationRoutes"));
const cors_1 = __importDefault(require("cors"));
const historialEquipos_1 = __importDefault(require("../routes/historialEquipos"));
const campanias_1 = __importDefault(require("../routes/campanias"));
const recursosCuadrillas_1 = __importDefault(require("../routes/recursosCuadrillas"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.routes();
        this.listen();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({ msg: 'API Working' });
        });
        // ✅ Registrar todas las rutas
        this.app.use('/api/equipos', equipos_1.default);
        this.app.use('/api/carreteras', carreteras_1.default);
        this.app.use('/api/comunicaciones', comunicaciones_1.default);
        this.app.use('/api/cuadrillas', cuadrillas_1.default);
        this.app.use('/api/retenes', retenes_1.default);
        this.app.use('/api/vehiculos', vehiculos_1.default);
        this.app.use('/api/estados', estados_1.default);
        this.app.use('/api/zonas', zonas_1.default);
        this.app.use('/api/tareas', tareas_1.default);
        this.app.use('/api/tablas-mantenimiento', tablasMantenimiento_1.default);
        this.app.use('/api/recursos', recursos_1.default);
        this.app.use('/api/recursosCuadrillas', recursosCuadrillas_1.default);
        this.app.use('/api/personal', personal_1.default);
        this.app.use('/api/estadosComunicacion', estadosComunicacion_1.default);
        this.app.use('/api/equipoPersonal', equipoPersonal_1.default);
        this.app.use('/api/carreteras-recurso-cuadrilla', carreterasRecursoCuadrilla_1.default);
        this.app.use('/api/tener-cta', tenerCta_1.default);
        this.app.use('/api', stationRoutes_1.default);
        this.app.use('/api/historial', historialEquipos_1.default);
        this.app.use('/api/campanias', campanias_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json()); // 👈 Esto debe estar antes de las rutas
        this.app.use(express_1.default.urlencoded({ extended: true })); // 👈 También necesario para `x-www-form-urlencoded`
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:4200', // Permitir peticiones solo desde tu aplicación Angular
        }));
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default.authenticate();
            console.log('Base de datos conectada');
        });
    }
}
exports.default = Server;
