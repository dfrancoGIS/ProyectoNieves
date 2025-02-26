import { Router } from 'express';
import {getCarreteras, actualizarEstadoCarretera, getCarreterasUltima, eliminarCarreteraController, insertarCarreteraController,editarCarreteraHandler, obtenerCarreterasPorCampania} from '../controllers/carreteras';

const router = Router();

router.get('/', getCarreteras);
router.put('/actualizar-estado', actualizarEstadoCarretera);
// Ruta para obtener carreteras de la última campaña
router.get('/ultima-campania', getCarreterasUltima);
// Ruta para eliminar una carretera
router.delete('/eliminar', eliminarCarreteraController);
// Ruta para insertar una nueva carretera
router.post('/insertar', insertarCarreteraController);
// Ruta para editar un registro de carretera
router.put('/editar/:id', editarCarreteraHandler);  // Usamos PUT para editar 
//Ruta para obtener carreteras filtradas por título de campaña
router.get('/filtrar', obtenerCarreterasPorCampania);

export default router;