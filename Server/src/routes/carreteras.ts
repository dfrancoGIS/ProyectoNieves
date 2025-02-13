import { Router } from 'express';
import {getCarreteras, actualizarEstadoCarretera} from '../controllers/carreteras';

const router = Router();

router.get('/', getCarreteras);
router.put('/actualizar-estado', actualizarEstadoCarretera);

export default router;