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
    console.log('Resultado da busca:', status, usuario); // Log para depuração
    
    if (status !== 200 || !usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // console.log('Comparando senha...'); // Log para depuração
    // const senhaValida = await bcrypt.compare(senha, usuario.senha);
    
    // if (!senhaValida) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Credenciais inválidas'
    //   });
    // }

    console.log('Gerando token...'); // Log para depuração
    const token = jwt.sign(
      { 
        id: usuario.id,
        email: usuario.email 
      },
      process.env.JWT_SECRET || 'segredo_default', // Fallback para desenvolvimento
      { expiresIn: '1h' }
    );

    console.log('Login bem-sucedido para:', usuario.email); // Log para depuração
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
    numero: usuario.numero
  }
});

  } catch (error) {
    console.error('Erro detalhado no login:', error); // Log detalhado
    return res.status(500).json({
      success: false,
      message: 'Erro interno no servidor',
      error: error.message // Retorna a mensagem de erro real
    });
  }
};
