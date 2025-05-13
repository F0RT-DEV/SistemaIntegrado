// matriculaRoutes.js
import { Router } from 'express';
import { autenticar } from '../authMiddleware.js';
import { criarEducacaoController } from '../controllers/matriculaController.js';

const router = Router();

router.post('/educacao', autenticar, criarEducacaoController);

export default router;