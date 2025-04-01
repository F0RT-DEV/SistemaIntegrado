import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    foto: null,
    nome: "",
    cpf: "",
    genero: "",
    cep: "",
    cidade: "VITORIA",
    logradouro: "AV.R",
    numero: "",
    bairro: "",
    complemento: "",
    email: "PEDRO.AGBRIEL2578@ICLOUD.COM"
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
    console.log('Campo alterado:', e.target.name, 'Valor:', e.target.value);
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
    if (!formData.nome || !formData.cpf || !formData.email) {
      setAlerta("Campos obrigatórios não preenchidos!");
      return;
    }

    console.log("Usuário cadastrado:", formData);
    setAlerta("");
    alert("Cadastro realizado com sucesso!");
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
          <label>NOME:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="DIGITE SEU NOME COMPLETO"
          />
        </div>
        
        <div className="form-group">
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="DIGITE SEU CPF"
          />
        </div>
        
        <div className="form-group">
          <label>GENERO:</label>
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
        
        <div className="form-row">
          <div className="form-group">
            <label>CEP:</label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="EX:29000.000"
            />
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
        </div>

        <div className="form-group">
            <label>UF:</label>
            <select
              name="uf"
              value={formData.uf}
              onChange={handleChange}
            >
              <option value="AC">AM</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>
        
        <div className="form-group">
          <label>LOGRADOURO:</label>
          <input
            type="text"
            name="logradouro"
            value={formData.logradouro}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>NUMERO:</label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
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
          />
        </div>
        
        <div className="form-group">
          <label>E-MAIL:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
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