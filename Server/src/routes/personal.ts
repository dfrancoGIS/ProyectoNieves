import { Router } from 'express';
import { obtenerPersonal, borrarPersonal, insertarPersonalHandler, editarPersonalHandler, obtenerPersonalPorCampania } from '../controllers/personal';

const router = Router();

// Ruta para obtener el personal
router.get('/', obtenerPersonal);

// Ruta para obtener el personal filtrado por título de campaña
router.get('/filtrar', obtenerPersonalPorCampania);

// Ruta para eliminar un registro de personal
router.delete('/eliminar', borrarPersonal);

// Ruta para insertar un nuevo personal
router.post('/insertar', insertarPersonalHandler);

// Ruta para editar un registro de personal
router.put('/editar/:id', editarPersonalHandler); // Usamos PUT para editar

export default router;
