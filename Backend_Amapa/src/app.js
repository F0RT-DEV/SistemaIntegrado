import express from 'express';
import cors from 'cors';
import pessoaRouter from './routes/pessoaRoutes.js';
import matriculaRouter from './routes/matriculaRoutes.js';
import pacienteRouter from './routes/pacienteRoutes.js';
import { autenticar } from './authMiddleware.js';
import { createPessoa, loginController } from './controllers/cadastropessoaController.js';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.post('/pessoas/login', loginController);
app.post('/pessoas', createPessoa);

app.use('/pessoas', pessoaRouter);
app.use('/matriculas', matriculaRouter);
app.use('/pacientes', pacienteRouter);
app.use('/app', autenticar);

// Rota de teste
app.get('/', (req, res) => {
    res.status(200).send({ mensagem: 'API funcionando' });
});

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});