import { Router } from 'express';
import { createPessoa, getPessoa, loginController, updatePessoa } from '../controllers/cadastropessoaController.js';
import { buscarUsuarioPorEmail } from '../models/cadastropessoaModel.js';
import { autenticar } from '../authMiddleware.js';



const router = Router();
// Atualizar dados do usuário (incluindo foto) - agora protegido
router.put('/:id', autenticar, updatePessoa);

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