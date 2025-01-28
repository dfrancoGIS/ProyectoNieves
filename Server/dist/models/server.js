"use strict";
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
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.routes();
        this.listen();
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
    }
    middlewares() {
        this.app.use(express_1.default.json()); // Middleware para parsear JSON
    }
}
exports.default = Server;
