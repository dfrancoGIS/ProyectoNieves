import { Router } from 'express';
import { getTareas, eliminarTareaHandler, insertarTareaController,editarTareaHandler, obtenerTareasPorCampania } from '../controllers/tareas';

const router = Router();

// Ruta para obtener las tareas de la última campaña
router.get('/ultima-campania', getTareas);

router.delete('/eliminar/:id_tarea', eliminarTareaHandler); // Eliminar tarea por ID

// Ruta para insertar tarea
router.post('/insertar', insertarTareaController);

// Ruta para editar un registro de tarea
router.put('/editar/:id', editarTareaHandler); 

router.get('/filtrar', obtenerTareasPorCampania);


export default router;