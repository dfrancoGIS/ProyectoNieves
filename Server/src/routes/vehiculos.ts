import { Router } from "express";
import { getVehiculos, getVehiculo, registrarVehiculo } from "../controllers/vehiculos";

const router = Router();

// ✅ Obtener todos los vehículos
router.get("/", getVehiculos);

// ✅ Obtener un vehículo por matrícula
router.get("/:matricula", getVehiculo);

// ✅ Insertar un nuevo vehículo
router.post("/", registrarVehiculo);

export default router;
