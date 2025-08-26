import { Router } from 'express';
import { criarConectSusController, vincularEspecialidadeController, agendarConsultaController, listarConsultasController } from '../controllers/pacienteController.js';

const router = Router();

// Listar consultas agendadas
router.get('/consultas', listarConsultasController);

// Vincular ao Conect SUS
router.post('/conect-sus', criarConectSusController);

// Vincular especialidade
router.post('/especialidades', vincularEspecialidadeController);

// Agendar consulta
router.post('/consultas', agendarConsultaController);

export default router;