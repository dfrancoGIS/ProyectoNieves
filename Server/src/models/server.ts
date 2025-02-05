import express, { Application, Request, Response } from 'express';
import routesEquipos from '../routes/equipos';
import routesCarreteras from '../routes/carreteras';
import routesComunicaciones from '../routes/comunicaciones';
import routesCuadrillas from '../routes/cuadrillas';
import routesRetenes from '../routes/retenes';
import routesVehiculos from '../routes/vehiculos'; 
import routesEstados from '../routes/estados';
import routesZonas from '../routes/zonas';
import routesTareas from '../routes/tareas';
import routesTablasMantenimiento from '../routes/tablasMantenimiento';
import routesRecursos from '../routes/recursos';
import routesPersonal from '../routes/personal';
import routesEstadosComunicacion from '../routes/estadosComunicacion';
import routesEquipoPersonal  from '../routes/equipoPersonal';
import routesCarreterasRecursoCuadrilla from '../routes/carreterasRecursoCuadrilla';
import routesTenerCta from '../routes/tenerCta';
import stationRoutes from '../routes/stationRoutes';

import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
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
        this.app.get('/', (req: Request, res: Response) => {
            res.json({ msg: 'API Working' });
        });

        // ✅ Registrar todas las rutas
        this.app.use('/api/equipos', routesEquipos);
        this.app.use('/api/carreteras', routesCarreteras);
        this.app.use('/api/comunicaciones', routesComunicaciones);
        this.app.use('/api/cuadrillas', routesCuadrillas);
        this.app.use('/api/retenes', routesRetenes);
        this.app.use('/api/vehiculos', routesVehiculos);
        this.app.use('/api/estados', routesEstados);
        this.app.use('/api/zonas', routesZonas);
        this.app.use('/api/tareas', routesTareas);
        this.app.use('/api/tablas-mantenimiento', routesTablasMantenimiento);
        this.app.use('/api/recursos', routesRecursos);
        this.app.use('/api/personal', routesPersonal);
        this.app.use('/api/estadosComunicacion', routesEstadosComunicacion);
        this.app.use('/api/equipoPersonal', routesEquipoPersonal);
        this.app.use('/api/carreteras-recurso-cuadrilla', routesCarreterasRecursoCuadrilla);
        this.app.use('/api/tener-cta', routesTenerCta);
        this.app.use('/api', stationRoutes);
    }

    middlewares() {
        this.app.use(express.json()); // 👈 Esto debe estar antes de las rutas
        this.app.use(express.urlencoded({ extended: true })); // 👈 También necesario para `x-www-form-urlencoded`
    }
    

    async dbConnect() {
        await db.authenticate();
        console.log('Base de datos conectada');
    }
}

export default Server;
