import { Router } from 'express';
import { getTenerCta,eliminarTenerCtaHandler, insertarTenerCtaController, editarTenerCtaHandler, obtenerTenerCtaPorCampania } from '../controllers/tenerCta';

const router = Router();

// Endpoint para obtener los datos de `tener_cta`
router.get('/', getTenerCta);

// Ruta para obtener registros filtrados por campaña
router.get('/filtrar', obtenerTenerCtaPorCampania);

// Ruta para eliminar un registro de 'tener_cta'
router.delete('/eliminar/:v_id_tener_cta', eliminarTenerCtaHandler);

// Ruta para insertar un nuevo registro de tener_cta
router.post('/insertar', insertarTenerCtaController);

// Ruta para editar un registro de tener_cta
router.put('/editar/:id', editarTenerCtaHandler);

export default router;