// routes/historialEquipos.ts
import { Router } from 'express';
import { obtenerHistorialEquipos } from '../controllers/historialEquipos';

const router = Router();

// Ruta para obtener el historial de equipos
router.get('/', obtenerHistorialEquipos);

export default router;
