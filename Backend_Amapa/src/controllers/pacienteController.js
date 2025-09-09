import { listarConsultas } from "../models/pacienteModel.js";
// Controller para listar consultas agendadas
export const listarConsultasController = async (req, res) => {
    // Buscar pelo nome do paciente, id do usuário, data_hora ou status
    // Sempre filtra pelo usuário logado
    const usuario_id = req.usuario?.id;
    if (!usuario_id) {
        return res.status(401).json({ mensagem: "Usuário não autenticado." });
    }
    const nome_paciente = req.query.nome_paciente;
    const data_hora = req.query.data_hora;
    const status = req.query.status;

    try {
        const consultas = await listarConsultas({ nome_paciente, usuario_id, data_hora, status });
        return res.status(200).json(consultas);
    } catch (error) {
        console.error('Erro ao listar consultas:', error);
        return res.status(500).json({ mensagem: error.message || 'Erro ao listar consultas' });
    }
};
import { agendarConsulta } from "../models/pacienteModel.js";
// Controller para agendar consulta
export const agendarConsultaController = async (req, res) => {
    const { nome_paciente, data_hora, medico_id, especialidade_id } = req.body;
    // Garante que o CPF do usuário logado seja usado
    // Log completo do usuário autenticado
    console.log('Conteúdo de req.usuario:', req.usuario);
    // Sempre usa o CPF e o ID do usuário autenticado
    const cpf_paciente = req.usuario?.cpf;
    const usuario_id = req.usuario?.id;
    console.log('Agendar consulta - usuario_id do JWT:', usuario_id);

    if (!nome_paciente || !data_hora || !medico_id || !especialidade_id || !cpf_paciente || !usuario_id) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios',
            campos_faltantes: {
                nome_paciente: !nome_paciente,
                data_hora: !data_hora,
                medico_id: !medico_id,
                especialidade_id: !especialidade_id,
                cpf_paciente: !cpf_paciente,
                usuario_id: !usuario_id
            }
        });
    }

    try {
        console.log('Agendar consulta - CPF do paciente:', cpf_paciente);
        console.log('Agendar consulta - usuario_id salvo:', usuario_id);
        const resultado = await agendarConsulta({ body: {
            nome_paciente,
            cpf_paciente,
            usuario_id,
            data_hora,
            medico_id,
            especialidade_id
        }});
        // Retorna todos os dados enviados para depuração no frontend
        return res.status(201).json({
            ...resultado,
            usuario_id,
            cpf_paciente,
            nome_paciente,
            data_hora,
            medico_id,
            especialidade_id
        });
    } catch (error) {
        console.error('Erro ao agendar consulta:', error);
        return res.status(500).json({
            mensagem: error.message || 'Erro ao agendar consulta',
        });
    }
};
import { criarConectSus, vincularEspecialidade } from "../models/pacienteModel.js";

export const criarConectSusController = async (req, res) => {
    const { pessoa_fisica_id, paciente_id } = req.body;

    if (!pessoa_fisica_id || !paciente_id) {
        return res.status(400).json({ 
            mensagem: 'Os campos pessoa_fisica_id e paciente_id são obrigatórios',
            campos_faltantes: {
                pessoa_fisica_id: !pessoa_fisica_id,
                paciente_id: !paciente_id
            }
        });
    }

    try {
        const resultado = await criarConectSus({ body: req.body });
        return res.status(201).json(resultado);
    } catch (error) {
        console.error('Erro no controller:', error);
        return res.status(500).json({
            mensagem: error.message || 'Erro ao vincular no Conect SUS',
        });
    }
};

export const vincularEspecialidadeController = async (req, res) => {
    const { paciente_id, especialidade_id } = req.body;

    if (!paciente_id || !especialidade_id) {
        return res.status(400).json({ 
            mensagem: 'Os campos paciente_id e especialidade_id são obrigatórios',
            campos_faltantes: {
                paciente_id: !paciente_id,
                especialidade_id: !especialidade_id
            }
        });
    }

    try {
        const resultado = await vincularEspecialidade({ body: req.body });
        return res.status(201).json(resultado);
    } catch (error) {
        console.error('Erro no controller:', error);
        return res.status(500).json({
            mensagem: error.message || 'Erro ao vincular especialidade ao paciente',
        });
    }
};