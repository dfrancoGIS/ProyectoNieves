import { Router } from 'express';
import { getEstados, eliminarEstadoHandler, insertarEstadoController, editarEstadoHandler } from '../controllers/estados';

const router = Router();

// ✅ Ruta para obtener todos los estados
router.get('/', getEstados);

router.delete('/eliminar/:id_estado', eliminarEstadoHandler);

// Ruta para insertar un nuevo estado
router.post("/insertar", insertarEstadoController);


// Ruta para editar un registro de estado
router.put('/editar/:id', editarEstadoHandler);

export default router;