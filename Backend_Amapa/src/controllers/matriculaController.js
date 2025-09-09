import { criarEducacao, listarMatriculas } from "../models/matriculaModel.js";
// Listar todas as matrículas cadastradas
export const listarMatriculasController = async (req, res) => {
    try {
        // Pega o CPF do usuário autenticado
        const cpf_aluno = req.usuario?.cpf;
        if (!cpf_aluno) {
            return res.status(400).json({ mensagem: "CPF do usuário não encontrado." });
        }
        const [status, matriculas] = await listarMatriculas(cpf_aluno);
        return res.status(status).json(matriculas);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao listar matrículas",
            erro: error.message,
            detalhes: error
        });
    }
};

export const criarEducacaoController = async (req, res) => {
    const {
        nome_aluno,
        cpf_aluno,
        data_nascimento,
        serie_ano,
        escola,
        turno,
        dependente_id // opcional, se vier do frontend
    } = req.body;

    // Pega o id do usuário autenticado como responsável
    const responsavel_id = req.usuario?.id;

    // Validação dos campos obrigatórios
    const camposFaltantes = {
        nome_aluno: !nome_aluno,
        cpf_aluno: !cpf_aluno,
        data_nascimento: !data_nascimento,
        serie_ano: !serie_ano,
        escola: !escola,
        turno: !turno
    };

    const algumFaltando = Object.values(camposFaltantes).some(faltando => faltando);
    if (algumFaltando) {
        return res.status(400).json({
            mensagem: 'Os campos nome_aluno, cpf_aluno, data_nascimento, serie_ano, escola e turno são obrigatórios',
            campos_faltantes: camposFaltantes
        });
    }

    // Monta o corpo para o model
    const dadosMatricula = {
        nome_aluno,
        cpf_aluno,
        data_nascimento,
        serie_ano,
        escola,
        turno,
        responsavel_id,
        dependente_id: dependente_id || null
    };

    try {
        const resultado = await criarEducacao({ body: dadosMatricula });
        return res.status(201).json(resultado);
    } catch (error) {
        console.error('Erro no controller:', error);
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar matrícula',
            erro: error.message,
            detalhes: error
        });
    }
};