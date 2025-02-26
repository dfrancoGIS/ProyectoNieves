import { Router } from 'express';
import { getRecursosCuadrillasHandler } from '../controllers/recursosCuadrillas';

const router = Router();

router.get('/', getRecursosCuadrillasHandler);
// Ruta para obtener recursos de la última campaña

export default router;