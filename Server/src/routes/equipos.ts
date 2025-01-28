import { Router } from 'express';
import { deleteEquipo, getEquipo, getEquipos, postEquipo, updateEquipo } from '../controllers/equipos';

const router = Router();

router.get('/', getEquipos)
router.get('/:id', getEquipo)
router.delete('/:id', deleteEquipo)
router.put('/:id', updateEquipo);
router.post('/', postEquipo)

export default router;