import express, { Application, Request, Response } from 'express';
import routesEquipos from '../routes/equipos';
import routesCarreteras from '../routes/carreteras';
import routesComunicaciones from '../routes/comunicaciones';
import routesCuadrillas from '../routes/cuadrillas';
import routesRetenes from '../routes/retenes';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
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
        this.app.get('/', (req: Request, res: Response) => {
            res.json({ msg: 'API Working' });
        });

        // ✅ Registrar todas las rutas
        this.app.use('/api/equipos', routesEquipos);
        this.app.use('/api/carreteras', routesCarreteras);
        this.app.use('/api/comunicaciones', routesComunicaciones);
        this.app.use('/api/cuadrillas', routesCuadrillas);
        this.app.use('/api/retenes', routesRetenes);
    }

    middlewares() {
        this.app.use(express.json()); // Middleware para parsear JSON
    }
}

export default Server;
