import { Router } from 'express';
import { getSales } from '../controllers/saleController.js';

const router = Router();

router.get('/', getSales);

export default router;