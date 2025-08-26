import { db } from '../db.js';
import bcrypt from 'bcrypt';


export const criandoPessoa = async (nome, cpf, telefone, email, data_nascimento, senha, genero, e_dependente, cep, endereco, complemento, numero, foto) => {
  console.log("cadastroPesssoaModel :: criandoPessoa (Firebase)");
  try {
    // Hash da senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);
    const pessoa = {
      nome: nome || "",
      cpf: cpf || "",
      telefone: telefone || "",
      email: email || "",
      data_nascimento: data_nascimento || "",
      senha: senhaHash,
      genero: genero || "",
      e_dependente: typeof e_dependente === 'undefined' ? false : e_dependente,
      cep: cep || "",
      endereco: endereco || "",
      complemento: complemento || "",
      numero: numero || "",
      foto: foto || ""
    };
    await db.collection("pessoa_fisica").add(pessoa);
    return [201, { menssagem: 'Cadastro realizado com sucesso'}];
  } catch (error) {
    console.log({menssagem: 'Erro ao cadastrar', error});
    return [500, { menssagem: 'Erro ao cadastrar', error }];
  }
};
// Atualizar dados do usuário (incluindo foto)
// Removido import do client SDK

export const atualizarPessoa = async (id, dadosAtualizados) => {
  try {
    await db.collection("pessoa_fisica").doc(id).update(dadosAtualizados);
    return [200, { mensagem: "Dados atualizados com sucesso" }];
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return [500, { mensagem: "Erro ao atualizar", error }];
  }
};

export const mostrarPessoa = async () => {
  console.log("cadastroPesssoaModel :: mostrarPessoa (Firebase)");
  try {
    const querySnapshot = await getDocs(collection(db, "pessoa_fisica"));
    const pessoas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return [200, pessoas];
  } catch (error) {
    console.log({menssagem: 'Erro ao mostrar', error});
    return [500, { menssagem: 'Erro ao mostrar', error }];
  }
};

export const buscarUsuarioPorEmail = async (email) => {
  try {
    const snapshot = await db.collection("pessoa_fisica")
      .where("email", "==", email)
      .get();
    if (snapshot.empty) {
      return [404, null];
    }
    // Retorna o primeiro usuário encontrado
    const usuario = snapshot.docs[0].data();
    usuario.id = snapshot.docs[0].id;
    return [200, usuario];
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return [500, null];
  }
};