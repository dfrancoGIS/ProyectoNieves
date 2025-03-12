import { Router } from 'express';
import { getRecursos, getRecursosEquipos, eliminarRecursoController, insertarRecursoController, editarRecursoHandler, obtenerRecursosPorCampania, obtenerTareasPorCampania, obtenerRecursosPorEmpresa } from '../controllers/recursos';

const router = Router();

router.get('/', getRecursosEquipos);
// Ruta para obtener recursos de la última campaña
router.get('/ultima-campania', getRecursos);
// Ruta para eliminar un recurso
router.delete('/eliminar', eliminarRecursoController);
// Ruta para insertar un recurso
router.post('/insertar', insertarRecursoController);
// Ruta para editar un recurso (utilizando PUT)
router.put('/editar/:id', editarRecursoHandler);
// Ruta para obtener los recursos filtrados por título de campaña
router.get('/filtrar', obtenerRecursosPorCampania);
// Ruta para obtener tareas filtradas por título de campaña
router.get('/filtrar', obtenerTareasPorCampania);
// Ruta para obtener los recursos filtrados por empresa
router.get('/recursos-por-empresa', obtenerRecursosPorEmpresa);

export default router;