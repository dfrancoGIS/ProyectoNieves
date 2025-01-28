import { Router } from 'express';
import { deleteCuadrilla, getCuadrilla, getCuadrillas, postCuadrilla, updateCuadrilla } from '../controllers/cuadrillas';

const router = Router();

router.get('/', getCuadrillas)
router.get('/:id', getCuadrilla)
router.delete('/:id', deleteCuadrilla)
router.put('/:id', updateCuadrilla);
router.post('/', postCuadrilla)

export default router;