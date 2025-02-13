import { Router } from 'express';
import { obtenerPersonal } from '../controllers/personal';

const router = Router();

// Ruta para obtener el personal
router.get('/', obtenerPersonal);

export default router;
