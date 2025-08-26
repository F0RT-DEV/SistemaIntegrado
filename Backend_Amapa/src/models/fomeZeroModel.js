import { db } from '../db.js';

// Função para verificar se dependentes estão frequentando a escola
async function dependentesFrequentandoEscola(userCpf) {
  const matriculasRef = db.collection('matriculas');
  const snapshot = await matriculasRef.where('cpf_responsavel', '==', userCpf).get();
  if (snapshot.empty) return true; // Sem dependentes, não bloqueia
  let todosFrequentando = true;
  snapshot.forEach(doc => {
    const matricula = doc.data();
    if (!matricula.status || matricula.status.toLowerCase() !== 'aprovada') {
      todosFrequentando = false;
    }
  });
  return todosFrequentando;
}

// Função para criar solicitação de cesta básica
async function criarSolicitacaoFomeZero({ nome, cpf, renda_familiar }) {
  let status = 'Em análise';
  let mensagem = '';
  let motivo = '';

  // Regra 1: Renda até 2 salários mínimos
  if (renda_familiar === 'Acima de 2 salários mínimos') {
    status = 'Rejeitado';
    motivo = 'Renda acima do permitido.';
    await db.collection('solicitacoes_fomezero').add({ nome, cpf, renda_familiar, status, motivo, data: new Date().toISOString() });
    return { aprovado: false, status, motivo };
  }

  // Regra 2: Se houver dependente, precisa estar frequentando escola
  const frequentaEscola = await dependentesFrequentandoEscola(cpf);
  if (!frequentaEscola) {
    status = 'Rejeitado';
    motivo = 'Dependente não está frequentando escola.';
    await db.collection('solicitacoes_fomezero').add({ nome, cpf, renda_familiar, status, motivo, data: new Date().toISOString() });
    return { aprovado: false, status, motivo };
  }

  // Se aprovado
  status = 'Aprovado';
  mensagem = 'Seu pedido foi aprovado! Em breve você receberá informações sobre a retirada da cesta básica. Parabéns! Sua cesta básica está disponível para retirada no CRAS mais próximo. Aguarde contato da equipe.';
  await db.collection('solicitacoes_fomezero').add({ nome, cpf, renda_familiar, status, mensagem, data: new Date().toISOString() });
  return { aprovado: true, status, mensagem };
}

export { criarSolicitacaoFomeZero };
