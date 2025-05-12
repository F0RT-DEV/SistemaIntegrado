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
            mensagem: 'Erro ao vincular no Conect SUS',
            erro: error.message,
            detalhes: error
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
            mensagem: 'Erro ao vincular especialidade ao paciente',
            erro: error.message,
            detalhes: error
        });
    }
};