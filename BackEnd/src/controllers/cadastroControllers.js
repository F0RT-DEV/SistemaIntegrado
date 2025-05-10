import {
	criandoUsuario,
	mostrarUsuarios,
	atualizandoUsuario,
} from "../models/cadastroModel.js";

export const createUser = async (req, res) => {
	console.log("cadastroControllers :: createUser");
	const {nome, email, senha, CPF} = req.body;
	try {
		const [status, resposta] = await criandoUsuario(nome, email, senha, CPF);
		res.status(status).json(resposta);
	} catch (error) {
		console.error(error);
		res.status(500).json({mensagem: "Erro ao criar o usuario"});
	}
};

export const readUsers = async (req, res) => {
	console.log("cadastroControllers :: readUsers");
	try {
		const [status, resposta] = await mostrarUsuarios();
		res.status(status).json(resposta);
	} catch (error) {
		console.error(error);
		res.status(500).json({mensagem: "Erro ao buscar os usuarios"});
	}
};

export const updateSenha = async (req, res) => {
	console.log("cadastroControllers :: updateSenha");
	const idpessoa_fisica = req.params.id_pessoa_fisica;
	const senha = req.body.senha;

	try {
		const [status, resposta] = await atualizandoUsuario(idpessoa_fisica, senha);
		res.status(status).json(resposta);
	} catch (error) {
		//console.log(error);
		res.status(500).json({mensagem: "erro ao atualizar produto"});
	}
};
