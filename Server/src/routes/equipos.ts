import { Router } from 'express';
import { getEquipo, getEquipos, registrarTurno, getTurnosTrabajoController } from '../controllers/equipos';

const router = Router();

// ✅ Obtener todos los equipos
router.get('/', getEquipos);

// ✅ Obtener un equipo por ID
router.get('/:id', getEquipo);

// ✅ Registrar turno de trabajo
router.post('/turno', registrarTurno);

// ✅ Obtener turnos de trabajo registrados
router.get('/turnos', getTurnosTrabajoController);

export default router;
