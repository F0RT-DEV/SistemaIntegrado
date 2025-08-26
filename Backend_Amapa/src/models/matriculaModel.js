
import { db } from '../db.js';
export const criarEducacao = async ({ body }) => {
    const {
        nome_aluno,
        cpf_aluno,
        data_nascimento,
        serie_ano,
        escola,
        turno,
        responsavel_id,
        dependente_id
    } = body;
    try {
        const docRef = await db.collection("educa_mais").add({
            nome_aluno,
            cpf_aluno,
            data_nascimento,
            serie_ano,
            escola,
            turno,
            responsavel_id: responsavel_id || null,
            dependente_id: dependente_id || null,
            status: "Em análise" // status inicial
        });
        return {
            success: true,
            id: docRef.id,
            mensagem: 'Matrícula escolar cadastrada com sucesso'
        };
    } catch (error) {
        console.error('Erro no model:', error);
        throw new Error(`Erro ao cadastrar matrícula: ${error.message}`);
    }
};

// Listar todas as matrículas cadastradas
export const listarMatriculas = async () => {
    try {
        const querySnapshot = await db.collection("educa_mais").get();
        const matriculas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return [200, matriculas];
    } catch (error) {
        console.error('Erro ao listar matrículas:', error);
        return [500, { mensagem: 'Erro ao listar matrículas', error }];
    }
};