import { Router } from 'express';
import { deleteCarretera, getCarretera, getCarreteras, postCarretera, updateCarretera } from '../controllers/carreteras';

const router = Router();

router.get('/', getCarreteras)
router.get('/:id', getCarretera)
router.delete('/:id', deleteCarretera)
router.put('/:id', updateCarretera);
router.post('/', postCarretera)

export default router;