import db from "../conexao.js";
import mysql from "mysql2/promise";

const conecxao = mysql.createPool(db);

export const criandoUsuario = async (nome, email, senha, CPF) => {
  console.log("cadastroModel :: criandoUsuario");
  const sql = `INSERT INTO pessoa_fisica (nome, email, senha, CPF) VALUES (?, ?, ?, ?)`;
  const params = [nome, email, senha, CPF];
   if(params != null){try {
        const [resposta] = await conecxao.query(sql, params);
        return [201, { mensagem: "Usuario criado com sucesso" }];
    } catch (error) {
        console.error(error);
        return [500, { mensagem: "Erro ao criar o usuario" }];
    }
} else {
    return [400, { mensagem: "Dados invalidos" }];
}
};

export const mostrarUsuarios = async () => {
  console.log("usuarioModel :: mostrarUsuarios");
  const sql = "SELECT * FROM pessoa_fisica";
  try {
    const [resposta] = ({} = await conecxao.query(sql));
    return [200, resposta];
  } catch (error) {
    console.error(error);
  }
};
// export const atualizandoProduto = async (id_produto, nome_produto) => {
//   console.log("ProdutoModule :: atualizandoProduto");
//   const sql = `UPDATE produto SET nome_produto = ? WHERE id_produto = ?`;
//   const params = [nome_produto, id_produto];
//   try {
//     const [resposta] = await conecxao.query(sql, params);
//     // console.log(resposta);
//     return [200, { mensagem: "Produto atualizado com sucesso" }];
//   } catch (error) {
//     console.error(error);
//   }
//  }
//  export const deletandoProduto = async (id_produto) => {
//   console.log("ProdutoModule :: deletandoProduto");
//   const sql = `DELETE FROM produto WHERE id_produto = ?`;
//   const params = [id_produto];
//   try {
//     const [resposta] = await conecxao.query(sql, params);

//     return [200, { mensagem: "Produto deletado com sucesso" }];
//     } catch (error) {
//       console.error(error);
//     }
//   }

// // mostrarProdutos();
// // criandoProduto('ameixa');
// // atualizandoProduto(1, 'maça');
// // console.log(await deletandoProduto(2));
