import { Router } from 'express';
import { getStationData, getStationDataById } from '../controllers/stationControllers';

const router = Router();

router.get('/station-data', getStationData);
router.get('/station-data/:id', getStationDataById); 

export default router;

