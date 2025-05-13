import { Router } from 'express';
import { criarConectSusController, vincularEspecialidadeController } from '../controllers/pacienteController.js';

const router = Router();

// Vincular ao Conect SUS
router.post('/conect-sus', criarConectSusController);

// Vincular especialidade
router.post('/especialidades', vincularEspecialidadeController);

export default router;