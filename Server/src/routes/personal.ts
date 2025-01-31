import { Router } from 'express';
import { getPersonal, registrarPersonal, modificarPersonal, borrarPersonal } from '../controllers/personal';

const router = Router();

/**
 * Ruta para obtener todos los registros de Personal.
 */
router.get('/', getPersonal);

/**
 * Ruta para registrar un nuevo personal.
 */
router.post('/', registrarPersonal);

/**
 * Ruta para actualizar un personal existente.
 */
router.put('/:id', modificarPersonal);

/**
 * Ruta para eliminar un personal.
 */
router.delete('/:id', borrarPersonal);

export default router;
