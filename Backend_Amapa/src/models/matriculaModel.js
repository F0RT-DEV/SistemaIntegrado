import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const criarEducacao = async ({ body }) => {
    const { matricula_id, pessoa_fisica_id, dependente_id } = body;
    const sql = `INSERT INTO educa_mais (matricula_id, pessoa_fisica_id, dependente_id) VALUES (?, ?, ?)`;
    const params = [matricula_id, pessoa_fisica_id || null, dependente_id || null];

    try {
        const [resultado] = await conexao.query(sql, params);
        return { 
            success: true,
            id: resultado.insertId,
            mensagem: 'Educação vinculada com sucesso' 
        };
    } catch (error) {
        console.error('Erro no model:', error);
        throw new Error(`Erro ao vincular educação: ${error.message}`);
    }
};