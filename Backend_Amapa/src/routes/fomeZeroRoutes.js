import express from 'express';

import { solicitarCestaBasicaController } from '../controllers/fomeZeroController.js';
import { consultarPedidosFomeZeroController } from '../controllers/fomeZeroConsultaController.js';
import { autenticar as authMiddleware } from '../authMiddleware.js';

const router = express.Router();
router.post('/fomezero/solicitar', authMiddleware, solicitarCestaBasicaController);

router.get('/fomezero/pedidos', authMiddleware, consultarPedidosFomeZeroController);

export default router;
