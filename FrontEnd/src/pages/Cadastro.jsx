import React, { useState, useEffect } from "react";
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
    uf: "",
    e_dependente: false
  });

  const [alerta, setAlerta] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingCep, setIsCheckingCep] = useState(false);
  const [isCheckingCpf, setIsCheckingCpf] = useState(false);
  const navigate = useNavigate();

  // Formatação dos campos
  const formatarCPF = (cpf) => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatarTelefone = (telefone) => {
    return telefone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const formatarCEP = (cep) => {
    return cep
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;
    if (name === 'cpf') {
      formattedValue = formatarCPF(value);
    } else if (name === 'telefone') {
      formattedValue = formatarTelefone(value);
    } else if (name === 'cep') {
      formattedValue = formatarCEP(value);
    } else if (name === 'e_dependente' && type === 'checkbox') {
      formattedValue = checked;
    }
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  // Validação de CEP via API
  const buscarEnderecoPorCEP = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    setIsCheckingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          endereco: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          uf: data.uf || "",
          complemento: data.complemento || ""
        }));
      } else {
        setAlerta("⚠️ CEP não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setAlerta("⚠️ Erro ao consultar CEP. Tente novamente.");
    } finally {
      setIsCheckingCep(false);
    }
  };

  // Validação de CPF desabilitada temporariamente
  // const validarCPF = async () => {
  //   const cpfLimpo = formData.cpf.replace(/\D/g, '');
  //   if (cpfLimpo.length !== 11) return;
  //   setIsCheckingCpf(true);
  //   try {
  //     const response = await api.validarCPF(cpfLimpo);
  //     if (!response.valido) {
  //       setAlerta("⚠️ CPF inválido ou já cadastrado!");
  //     }
  //   } catch (error) {
  //     console.error("Erro ao validar CPF:", error);
  //     setAlerta("⚠️ Erro ao validar CPF. Tente novamente.");
  //   } finally {
  //     setIsCheckingCpf(false);
  //   }
  // };

  // Efeito para buscar CEP quando completo
  useEffect(() => {
    if (formData.cep.replace(/\D/g, '').length === 8) {
      buscarEnderecoPorCEP();
    }
  }, [formData.cep]);

  // Validação de CPF desabilitada temporariamente
  // useEffect(() => {
  //   if (formData.cpf.replace(/\D/g, '').length === 11) {
  //     validarCPF();
  //   }
  // }, [formData.cpf]);

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

    if (formData.cpf.replace(/\D/g, '').length !== 11) {
      setAlerta("⚠️ CPF inválido! Deve conter 11 dígitos.");
      return false;
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
        cpf: formData.cpf.replace(/\D/g, ''),
        telefone: formData.telefone.replace(/\D/g, ''),
        email: formData.email,
        data_nascimento: formData.data_nascimento,
        senha: formData.senha,
        genero: formData.genero,
        e_dependente: formData.e_dependente,
        cep: formData.cep.replace(/\D/g, ''),
        endereco: formData.endereco,
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
            <div className="form-group" style={{ margin: '18px 0' }}>
              <div style={{
                background: '#f5f6fa',
                borderRadius: '12px',
                padding: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <input
                  type="checkbox"
                  id="e_dependente"
                  name="e_dependente"
                  checked={formData.e_dependente}
                  onChange={handleChange}
                  style={{ width: '22px', height: '22px', accentColor: '#6c63ff' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '1.1em', color: '#6c63ff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {/* Ícone de usuário dependente/responsável */}
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#6c63ff"/><path d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#6c63ff" strokeWidth="2"/></svg>
                    Dependente ou Responsável
                  </span>
                  <span style={{ fontSize: '0.98em', color: '#333' }}>
                    Marque se você é <b>dependente</b> (filho, tutelado, etc).<br />Desmarcado indica <b>responsável</b> (pai, mãe, tutor).
                  </span>
                </div>
              </div>
            </div>
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
                  maxLength="14"
                  required
                />
                {isCheckingCpf && <span className="loading-text">Validando CPF...</span>}
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
                  maxLength="15"
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
                  maxLength="9"
                />
                {isCheckingCep && <span className="loading-text">Buscando endereço...</span>}
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
            disabled={isLoading || isCheckingCep || isCheckingCpf}
          >
            {isLoading ? 'CADASTRANDO...' : 'FINALIZAR CADASTRO'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;