import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    foto: null,
    nome: "",
    documento_de_identificacao: "",
    telefone: "",
    email: "",
    data_nascimento: "",
    senha: "",
    confirmarSenha: "",
    genero: "",
    cep: "",
    endereco: "",
    complemento: "",
    n_casa: "",
    cidade: "VITORIA",
    bairro: "",
    uf: "ES"
  });

  const [alerta, setAlerta] = useState("");
  const [previewFoto, setPreviewFoto] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
        setFormData(prev => ({
          ...prev,
          foto: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleCadastro = () => { 
    // Validação dos campos obrigatórios
    if (!formData.nome || !formData.documento_de_identificacao || !formData.email || !formData.senha) {
      setAlerta("⚠️ Preencha todos os campos obrigatórios!");
      return;
    }
    
    // Validação da senha
    if (formData.senha !== formData.confirmarSenha) {
      setAlerta("⚠️ As senhas não coincidem!");
      return;
    }
    
    // Validação de força da senha (opcional)
    if (formData.senha.length < 6) {
      setAlerta("⚠️ A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    console.log("Usuário cadastrado:", formData);
    setAlerta("");
    alert(" Cadastro realizado com sucesso!");
    navigate("/");
  };
  
  return (
    <div className="cadastro-full">
      <div className="editar-perfil-container">
        <h1>EDITAR PERFIL</h1>
        
        <div className="foto-perfil">
          <label>ADICIONE FOTO DE PERFIL</label>
          <div 
            className={`foto-placeholder ${previewFoto ? 'has-foto' : ''}`}
            onClick={triggerFileInput}
          >
            {previewFoto ? (
              <img src={previewFoto} alt="Foto de perfil" className="foto-preview" />
            ) : (
              <span>+</span>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFotoChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
        
        {alerta && <div className="alerta">{alerta}</div>}
        
        <div className="form-group">
          <label>NOME COMPLETO:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="DIGITE SEU NOME COMPLETO"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>CPF:</label>
            <input
              type="text"
              name="documento_de_identificacao"
              value={formData.documento_de_identificacao}
              onChange={handleChange}
              placeholder="DIGITE SEU CPF"
              required
            />
          </div>
          
          <div className="form-group">
            <label>DATA DE NASCIMENTO:</label>
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
            <label>TELEFONE:</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="DIGITE SEU TELEFONE"
            />
          </div>
          
          <div className="form-group">
            <label>GÊNERO:</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
            >
              <option value="">SELECIONE</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>E-MAIL:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="DIGITE SEU E-MAIL"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>SENHA:</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="CRIE UMA SENHA"
              required
            />
          </div>
          
          <div className="form-group">
            <label>CONFIRMAR SENHA:</label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="CONFIRME SUA SENHA"
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>CEP:</label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="EX: 29000-000"
            />
          </div>
          
          <div className="form-group">
            <label>UF:</label>
            <select
              name="uf"
              value={formData.uf}
              onChange={handleChange}
            >
              <option value="ES">ES</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              {/* Outras opções de UF... */}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>CIDADE:</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            disabled
          />
        </div>
        
        <div className="form-group">
          <label>ENDEREÇO:</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="DIGITE SEU ENDEREÇO"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>NÚMERO:</label>
            <input
              type="text"
              name="n_casa"
              value={formData.n_casa}
              onChange={handleChange}
              placeholder="NÚMERO"
            />
          </div>
          
          <div className="form-group">
            <label>BAIRRO:</label>
            <input
              type="text"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              placeholder="DIGITE SEU BAIRRO"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>COMPLEMENTO:</label>
          <input
            type="text"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
            placeholder="COMPLEMENTO (OPCIONAL)"
          />
        </div>
        
        <button onClick={handleCadastro} className="cadastro-button">
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Cadastro;