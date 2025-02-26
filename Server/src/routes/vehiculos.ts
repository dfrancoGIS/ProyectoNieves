import { Router } from "express";
import { getVehiculos, getVehiculosDetalle, eliminarVehiculoHandler, insertarVehiculoController,editarVehiculoHandler, obtenerVehiculosPorCampania } from "../controllers/vehiculos";

const router = Router();

// ✅ Obtener todos los vehículos
router.get("/", getVehiculos);

// Ruta para eliminar un vehículo por su ID
router.delete('/eliminar/:id_vehiculo', eliminarVehiculoHandler);

// ✅ Ruta para obtener vehículos de la última campaña
router.get('/ultima-campania', getVehiculosDetalle);
// Ruta para insertar vehículo
router.post('/insertar', insertarVehiculoController);

// ✅ Ruta para obtener los vehículos filtrados por título de campaña
router.get('/filtrar', obtenerVehiculosPorCampania);


router.put('/editar/:id', editarVehiculoHandler);  
export default router;
