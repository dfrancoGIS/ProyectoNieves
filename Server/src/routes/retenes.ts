import { Router } from 'express';
import { deleteReten, getRetenes, getReten, postReten, updateReten } from '../controllers/retenes';

const router = Router();

router.get('/', getRetenes)
router.get('/:id', getReten)
router.delete('/:id', deleteReten)
router.put('/:id', updateReten);
router.post('/', postReten)

export default router;