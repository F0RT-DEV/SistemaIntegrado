import { db } from '../db.js';

export async function consultarPedidosFomeZeroController(req, res) {
  try {
    const cpf = req.query.cpf;
    if (!cpf) {
      return res.status(400).json({ error: 'CPF não informado.' });
    }
    const snapshot = await db.collection('solicitacoes_fomezero').where('cpf', '==', cpf).get();
    if (snapshot.empty) {
      return res.status(200).json([]);
    }
    const pedidos = [];
    snapshot.forEach(doc => {
      pedidos.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json(pedidos);
  } catch (err) {
    console.error('Erro ao consultar pedidos Fome Zero:', err);
    return res.status(500).json({ error: 'Erro interno ao consultar pedidos.' });
  }
}
