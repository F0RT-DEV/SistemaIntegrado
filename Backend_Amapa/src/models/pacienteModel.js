import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const criarConectSus = async (req, res) => {
    const { pessoa_fisica_id, paciente_id } = req.body;
    const sql = `INSERT INTO conect_sus (pessoa_fisica_id, paciente_id) VALUES (?, ?)`;
    const params = [pessoa_fisica_id, paciente_id];

    try {
        const [resultado] = await conexao.query(sql, params);
        return res.status(201).json({ mensagem: 'Paciente vinculado ao Conect SUS com sucesso' });
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao vincular no Conect SUS',
            code: error.code,
            sql: error.sqlMessage,
        });
    }
};
export const vincularEspecialidade = async (req, res) => {
    const { paciente_id, especialidade_id } = req.body;
    const sql = `INSERT INTO paciente_especialidade (paciente_id, especialidade_id) VALUES (?, ?)`;
    const params = [paciente_id, especialidade_id];

    try {
        const [resultado] = await conexao.query(sql, params);
        return res.status(201).json({ mensagem: 'Especialidade vinculada com sucesso ao paciente' });
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao vincular especialidade ao paciente',
            code: error.code,
            sql: error.sqlMessage,
        });
    }
};