import { Router } from 'express';
import { createPessoa, getPessoa, loginController } from '../controllers/cadastropessoaController.js';


const router = Router();

// Cadastro de pessoa
router.post('/', createPessoa);

// Listagem de pessoas
router.get('/', getPessoa);

router.post('/login', loginController);

export default router;