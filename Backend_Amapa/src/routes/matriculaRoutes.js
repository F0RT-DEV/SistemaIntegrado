// matriculaRoutes.js
import { Router } from 'express';
import { autenticar } from '../authMiddleware.js';
import { criarEducacaoController, listarMatriculasController } from '../controllers/matriculaController.js';

const router = Router();

router.post('/educacao', autenticar, criarEducacaoController);

router.get('/educacao', autenticar, listarMatriculasController);

export default router;