import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./Cadastro.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    data_nascimento: "",
    senha: "",
    confirmarSenha: "",
    genero: "",
    cep: "",
    endereco: "",
    complemento: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: ""
  });

  const [alerta, setAlerta] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validarCampos = () => {
    const camposObrigatorios = [
      'nome', 'cpf', 'email', 'senha', 'confirmarSenha', 'data_nascimento'
    ];

    for (const campo of camposObrigatorios) {
      if (!formData[campo]) {
        setAlerta(`⚠️ O campo ${campo.replace('_', ' ')} é obrigatório!`);
        return false;
      }
    }

    if (formData.senha !== formData.confirmarSenha) {
      setAlerta("⚠️ As senhas não coincidem!");
      return false;
    }

    if (formData.senha.length < 6) {
      setAlerta("⚠️ A senha deve ter pelo menos 6 caracteres!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarCampos()) return;

    setIsLoading(true);
    setAlerta("");

    try {
      await api.cadastrarUsuario({
        nome: formData.nome,
        cpf: formData.cpf,
        telefone: formData.telefone,
        email: formData.email,
        data_nascimento: formData.data_nascimento,
        senha: formData.senha,
        genero: formData.genero,
        e_dependente: false,
        cep: formData.cep,
        endereço: formData.endereco,
        complemento: formData.complemento,
        numero: formData.numero,
        bairro: formData.bairro,
        cidade: formData.cidade,
        uf: formData.uf
      });

      alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");
      navigate("/login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setAlerta(`⚠️ ${error.message || 'Erro ao cadastrar. Tente novamente.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cadastro-full">
      <div className="editar-perfil-container">
        <h1>CADASTRO DE USUÁRIO</h1>
        
        {alerta && <div className="alerta">{alerta}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Informações Pessoais</h2>
            
            <div className="form-group">
              <label>NOME COMPLETO *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>CPF *</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>DATA DE NASCIMENTO *</label>
                <input
                  type="date"
                  name="data_nascimento"
                  value={formData.data_nascimento}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>TELEFONE</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                />
              </div>
              
              <div className="form-group">
                <label>GÊNERO</label>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Informações de Acesso</h2>
            
            <div className="form-group">
              <label>E-MAIL *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>SENHA *</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>CONFIRMAR SENHA *</label>
                <input
                  type="password"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Endereço</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>CEP</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                />
              </div>
              
              <div className="form-group">
                <label>UF</label>
                <select
                  name="uf"
                  value={formData.uf}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  {/* Adicione todos os estados */}
                  <option value="ES">ES</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>CIDADE</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Sua cidade"
              />
            </div>

            <div className="form-group">
              <label>ENDEREÇO</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder="Rua, Avenida, etc."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>NÚMERO</label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="Nº"
                />
              </div>
              
              <div className="form-group">
                <label>BAIRRO</label>
                <input
                  type="text"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  placeholder="Seu bairro"
                />
              </div>
            </div>

            <div className="form-group">
              <label>COMPLEMENTO</label>
              <input
                type="text"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
                placeholder="Apartamento, bloco, etc."
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="cadastro-button" 
            disabled={isLoading}
          >
            {isLoading ? 'CADASTRANDO...' : 'FINALIZAR CADASTRO'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;