import { Router } from 'express';
import { getEstados } from '../controllers/estados';

const router = Router();

// ✅ Ruta para obtener todos los estados
router.get('/', getEstados);

export default router;