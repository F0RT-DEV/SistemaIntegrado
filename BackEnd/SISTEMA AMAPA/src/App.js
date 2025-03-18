import express from 'express';
import { createUser, readUsers } from './controllers/cadastroControllers.js';
const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando !');
});

app.post('/users', createUser );
app.get('/mostrarUsuarios', readUsers );

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
