import { Router } from 'express';
import { getCarreterasPorNombre, getCarreterasPorPrioridad, getCarreteras, putEstadoCarretera } from '../controllers/carreteras';

const router = Router();

router.get('/', getCarreteras)
router.get('/nombre/:nombre', getCarreterasPorNombre);
router.get('/prioridad/:prioridad', getCarreterasPorPrioridad);
router.put('/estado', putEstadoCarretera);

export default router;