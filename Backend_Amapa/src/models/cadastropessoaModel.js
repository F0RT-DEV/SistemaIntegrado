import db from '../db.js';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const conexao = mysql.createPool(db);

export const criandoPessoa = async (nome, cpf, telefone, email, data_nascimento, senha, genero, e_dependente, cep, endereco, complemento, numero) => {
    console.log("cadastroPesssoaModel :: criandoPessoa");
    const senhaHash = await bcrypt.hash(senha, 10);

    const sql = `INSERT INTO pessoa_fisica (nome, cpf, telefone, email, data_nascimento, senha, genero, e_dependente, cep, endereco, complemento, numero) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [nome, cpf, telefone, email, data_nascimento, senhaHash, genero, e_dependente, cep, endereco, complemento, numero];

    try {
        const [resposta] = await conexao.query(sql, params);
        return [201, { menssagem: 'Cadastro realizado com sucesso'}];
    } catch (error) {
        console.log({menssagem: 'Erro ao cadastrar', 
        code: error.code, sql: error.sqlMessage,
        })
    }
}

export const mostrarPessoa = async () => {
    console.log("cadastroPesssoaModel :: mostrarPessoa");
    const sql = `SELECT * FROM pessoa_fisica`;
    try {
        const [resposta] = await conexao.query(sql);
        return [200, resposta];
    } catch (error) {
        console.log({menssagem: 'Erro ao mostrar', 
        code: error.code, sql: error.sqlMessage,
        })
    }
}

export const buscarUsuarioPorEmail = async (email) => {
    console.log("cadastroPesssoaModel :: buscarUsuarioPorEmail");
    const sql = `SELECT * FROM pessoa_fisica WHERE email = ?`;
    
    try {
      const [resposta] = await conexao.query(sql, [email]);
      return [200, resposta[0] || null];
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return [500, { mensagem: 'Erro ao buscar usuário', erro: error.message }];
    }
  };