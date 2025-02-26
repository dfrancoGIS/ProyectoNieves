import { Router } from 'express';
import { getCampaniasController, eliminarCampaniaHandler, crearNuevaCampaniaHandler, getCampaniasFiltradasController } from '../controllers/campanias';

const router = Router();

// Ruta para obtener todas las campañas
router.get('/', getCampaniasController);

router.get('/filtradas', getCampaniasFiltradasController);

// Ruta para eliminar una campaña por su ID
router.delete('/eliminar/:id_campania', eliminarCampaniaHandler);

// ✅ Crear una nueva campaña
router.post('/crear', crearNuevaCampaniaHandler);

export default router;
