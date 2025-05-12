import { criarEducacao } from "../models/matriculaModel.js";

export const criarEducacaoController = async (req, res) => {
    const { matricula_id, pessoa_fisica_id, dependente_id } = req.body;


    if (!matricula_id || !pessoa_fisica_id) {
        return res.status(400).json({ 
            mensagem: 'Os campos matricula_id e pessoa_fisica_id são obrigatórios',
            campos_faltantes: {
                matricula_id: !matricula_id,
                pessoa_fisica_id: !pessoa_fisica_id
            }
        });
    }

    try {
        const resultado = await criarEducacao({ body: req.body });
        return res.status(201).json(resultado);
    } catch (error) {
        console.error('Erro no controller:', error);
        return res.status(500).json({
            mensagem: 'Erro ao vincular educação',
            erro: error.message,
            detalhes: error
        });
    }
};