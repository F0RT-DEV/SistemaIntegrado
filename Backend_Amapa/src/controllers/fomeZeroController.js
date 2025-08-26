import { criarSolicitacaoFomeZero } from '../models/fomeZeroModel.js';

async function solicitarCestaBasicaController(req, res) {
  try {
    const { nome, cpf, renda_familiar } = req.body;
    if (!nome || !cpf || !renda_familiar) {
      return res.status(400).json({ error: 'Dados obrigatórios não informados.' });
    }
    const resultado = await criarSolicitacaoFomeZero({ nome, cpf, renda_familiar });
    if (resultado.aprovado) {
      return res.status(201).json({ aprovado: true, status: resultado.status, mensagem: resultado.mensagem });
    } else {
      return res.status(200).json({ aprovado: false, status: resultado.status, motivo: resultado.motivo });
    }
  } catch (err) {
    console.error('Erro ao solicitar cesta básica:', err);
    return res.status(500).json({ error: 'Erro interno ao processar solicitação.' });
  }
}

export { solicitarCestaBasicaController };
