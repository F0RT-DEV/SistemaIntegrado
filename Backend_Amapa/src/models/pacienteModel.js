import { db } from '../db.js';

// Listar consultas agendadas por nome ou id do usuário
export const listarConsultas = async ({ nome_paciente, usuario_id, data_hora, status }) => {
    let queryRef = db.collection('consultas');
    if (nome_paciente) queryRef = queryRef.where('nome_paciente', '==', nome_paciente);
    if (usuario_id) queryRef = queryRef.where('usuario_id', '==', usuario_id);
    if (data_hora) queryRef = queryRef.where('data_hora', '==', data_hora);
    if (status) queryRef = queryRef.where('status', '==', status);
    const snapshot = await queryRef.get();
    // Garante que o campo cpf_paciente sempre aparece, mesmo se estiver undefined
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            nome_paciente: data.nome_paciente,
            cpf_paciente: data.cpf_paciente || null,
            usuario_id: data.usuario_id || null,
            data_hora: data.data_hora,
            medico_id: data.medico_id,
            especialidade_id: data.especialidade_id,
            status: data.status || 'Pendente',
            criado_em: data.criado_em
        };
    });
};

// Agendar consulta de paciente
export const agendarConsulta = async ({ body }) => {
    const { nome_paciente, cpf_paciente, usuario_id, data_hora, medico_id, especialidade_id } = body;
    try {
        // Garante que o campo cpf_paciente sempre será salvo
        await db.collection('consultas').add({
            nome_paciente,
            cpf_paciente: cpf_paciente || null,
            usuario_id: usuario_id || null,
            data_hora,
            medico_id,
            especialidade_id,
            criado_em: new Date().toISOString()
        });
        return { mensagem: 'Consulta agendada com sucesso' };
    } catch (error) {
        throw new Error('Erro ao agendar consulta: ' + error.message);
    }
};

// Vincular paciente ao Conect SUS
export const criarConectSus = async ({ body }) => {
    const { pessoa_fisica_id, paciente_id } = body;
    try {
        await addDoc(collection(db, 'conect_sus'), {
            pessoa_fisica_id,
            paciente_id,
            vinculado_em: new Date().toISOString()
        });
        return { mensagem: 'Paciente vinculado ao Conect SUS com sucesso' };
    } catch (error) {
        throw new Error('Erro ao vincular no Conect SUS: ' + error.message);
    }
};

// Vincular especialidade ao paciente
export const vincularEspecialidade = async ({ body }) => {
    const { paciente_id, especialidade_id } = body;
    try {
        await addDoc(collection(db, 'paciente_especialidade'), {
            paciente_id,
            especialidade_id,
            vinculado_em: new Date().toISOString()
        });
        return { mensagem: 'Especialidade vinculada com sucesso ao paciente' };
    } catch (error) {
        throw new Error('Erro ao vincular especialidade ao paciente: ' + error.message);
    }
};