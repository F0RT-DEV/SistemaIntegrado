import {
  buscarUsuarioPorEmail,
  criandoPessoa,
  mostrarPessoa,
  atualizarPessoa
} from "../models/cadastropessoaModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const createPessoa = async (req, res) => {
    console.log("cadastroPesssoaController :: createPessoa");

    const { nome, cpf, telefone, email, data_nascimento, senha, genero, e_dependente, cep, endereco, complemento, numero, foto } = req.body;

    try {
      const [status, resposta] = await criandoPessoa(
        nome,
        cpf,
        telefone,
        email,
        data_nascimento,
        senha, // Já será hasheada no model
        genero,
        e_dependente,
        cep,
        endereco,
        complemento,
        numero,
        foto
      );

      if (status !== 201) {
        throw new Error(resposta.mensagem || 'Erro ao cadastrar');
      }

      return res.status(status).json(resposta);
    } catch (error) {
      console.error("Erro detalhado:", error);
      return res.status(500).json({
        mensagem: "Erro ao cadastrar",
        erro: error.message,
        detalhes: error
      });
    }
};
// Atualizar dados do usuário (incluindo foto)
export const updatePessoa = async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;
  try {
    const [status, resposta] = await atualizarPessoa(id, dadosAtualizados);
    if (status !== 200) {
      return res.status(status).json(resposta);
    }
    // Buscar usuário atualizado
    const doc = await (await import('../db.js')).db.collection("pessoa_fisica").doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ mensagem: "Usuário não encontrado após atualização" });
    }
    const usuarioAtualizado = { id: doc.id, ...doc.data() };
    return res.status(200).json(usuarioAtualizado);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar",
      erro: error.message,
      detalhes: error
    });
  }
};


export const getPessoa = async (req, res) => {
  console.log("cadastroPesssoaController :: getPessoa");

  try {
    const [status, resposta] = await mostrarPessoa();
    return res.status(status).json(resposta);
  } catch (error) {
    return res.status(500).json({
      menssagem: "Erro ao mostrar",
      code: error.code,
      sql: error.sqlMessage,
    });
  }
};

// Mantenha os outros imports e altere o loginController para:
export const loginController = async (req, res) => {
  const { email, senha } = req.body;

  console.log('Tentativa de login com:', email); // Log para depuração

  if (!email || !senha) {
    return res.status(400).json({ 
      success: false,
      message: 'Email e senha são obrigatórios' 
    });
  }

  try {
    const [status, usuario] = await buscarUsuarioPorEmail(email);
    if (status !== 200 || !usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Validação de senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    const token = jwt.sign(
      { 
        id: usuario.id,
        email: usuario.email,
        cpf: usuario.cpf // Adiciona o CPF ao payload do JWT
      },
      process.env.JWT_SECRET || 'segredo_default',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        genero: usuario.genero,
        telefone: usuario.telefone,
        data_nascimento: usuario.data_nascimento,
        cep: usuario.cep,
        endereco: usuario.endereco,
        complemento: usuario.complemento,
        numero: usuario.numero,
        foto: usuario.foto || "" // Adiciona o campo foto na resposta
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro interno no servidor',
      error: error.message
    });
  }
}
