import {
  buscarUsuarioPorEmail,
  criandoPessoa,
  mostrarPessoa,
} from "../models/cadastropessoaModel.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
export const createPessoa = async (req, res) => {
    console.log("cadastroPesssoaController :: createPessoa");
  
    const { nome, cpf, telefone, email, data_nascimento, senha, genero, e_dependente, cep, endereço, complemento, numero } = req.body;
  
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
        endereço,
        complemento,
        numero
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

export const loginController = async (req, res) => {
    const { email, senha } = req.body;
  
    if (!email || !senha) {
      return res.status(400).json({ 
        mensagem: 'Email e senha são obrigatórios' 
      });
    }
  
    try {
      const [status, usuario] = await buscarUsuarioPorEmail(email);
      
      if (status !== 200 || !usuario) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas' });
      }
  
      // Comparação de senha (simples - em produção use bcrypt)
      if (usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas' });
      }
  
      // Remove a senha do objeto antes de retornar
      const { senha: _, ...usuarioSemSenha } = usuario;
      
      // Gera token JWT
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      return res.status(200).json({
        mensagem: 'Login realizado com sucesso',
        usuario: usuarioSemSenha,
        token
      });
  
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({
        mensagem: 'Erro ao realizar login',
        erro: error.message
      });
    }
  };
;
