import { criandoUsuario, mostrarUsuarios } from "../models/cadastroModel.js";

export const createUser = async (req, res) => {
  console.log("cadastroControllers :: createUser");
  const { nome, email, senha, CPF } = req.body;
  try {
    const [status, resposta] = await criandoUsuario(nome, email, senha, CPF);
    res.status(status).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao criar o usuario" });
  }
};

export const readUsers = async (req, res) =>  {
  console.log("cadastroControllers :: readUsers");
  try {
    const [status, resposta] = await mostrarUsuarios();
    res.status(status).json(resposta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar os usuarios" });
  }
};
