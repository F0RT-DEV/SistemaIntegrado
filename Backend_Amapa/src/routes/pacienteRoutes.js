import { Router } from 'express';
import { criarConectSusController, vincularEspecialidadeController, agendarConsultaController, listarConsultasController } from '../controllers/pacienteController.js';

const router = Router();

router.get('/consultas', listarConsultasController);

router.post('/conect-sus', criarConectSusController);

router.post('/especialidades', vincularEspecialidadeController);

router.post('/consultas', agendarConsultaController);

export default router;