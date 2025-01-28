import { Router } from 'express';
import { deleteComunicacion, getComunicaciones, getComunicacion, postComunicacion, updateComunicacion } from '../controllers/comunicaciones';

const router = Router();

router.get('/', getComunicaciones)
router.get('/:id', getComunicacion)
router.delete('/:id', deleteComunicacion)
router.put('/:id', updateComunicacion);
router.post('/', postComunicacion)

export default router;