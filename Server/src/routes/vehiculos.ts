import { Router } from "express";
import { getVehiculos } from "../controllers/vehiculos";

const router = Router();

// ✅ Obtener todos los vehículos
router.get("/", getVehiculos);
export default router;
