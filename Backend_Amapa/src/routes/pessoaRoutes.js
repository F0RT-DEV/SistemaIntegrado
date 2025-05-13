import { Router } from 'express';
import { createPessoa, getPessoa, loginController } from '../controllers/cadastropessoaController.js';


const router = Router();

// Cadastro de pessoa
router.post('/', createPessoa);

// Listagem de pessoas
router.get('/', getPessoa);

router.post('/login', loginController);

router.get('/perfil', autenticar, async (req, res) => {
  const email = req.usuario.email;
  const [status, usuario] = await buscarUsuarioPorEmail(email);
  if (status !== 200 || !usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
  res.status(200).json(usuario);
});

export default router;