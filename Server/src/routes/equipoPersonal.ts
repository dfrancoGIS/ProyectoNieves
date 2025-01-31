import { Router } from 'express';
import { getEquipoPersonal } from '../controllers/equipoPersonal';

const router = Router();

/**
 * Ruta para obtener el personal asignado a un equipo específico.
 */
router.get('/:idEquipo', getEquipoPersonal);

export default router;
