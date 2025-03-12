import { Router } from 'express';
import { insertarActivacionHandler, obtenerActivacionesHandler, editarActivacionHandler, buscarActivacionHandler } from '../controllers/activacion';

const router = Router();

router.post('/insertar', insertarActivacionHandler);
router.get('/obtener', obtenerActivacionesHandler); 
router.put('/editar', editarActivacionHandler);
router.get('/buscar', buscarActivacionHandler);

export default router;
