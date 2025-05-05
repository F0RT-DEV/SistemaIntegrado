import React, { useState } from "react";
import "./PerfilUsuario.css";
import { User, Mail, MapPin, Grid, Pencil, X, Check } from "lucide-react";

const PerfilUsuario = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    nome: "Maria da Silva",
    email: "maria@email.com",
    foto: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    cpf: "123.456.789-00",
    genero: "Feminino",
    logradouro: "Rua das Flores",
    numero: "123",
    bairro: "Centro",
    cidade: "São Paulo",
    uf: "SP",
    complemento: "Apto 101"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você pode adicionar a lógica para salvar no backend
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h1>
          <User size={24} />
          Meu Perfil
        </h1>
        <button 
          className={`edit-button ${isEditing ? 'editing' : ''}`}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <Check size={16} />
              Salvar
            </>
          ) : (
            <>
              <Pencil size={16} />
              Editar
            </>
          )}
        </button>
        {isEditing && (
          <button 
            className="cancel-button"
            onClick={() => setIsEditing(false)}
          >
            <X size={16} />
            Cancelar
          </button>
        )}
      </div>
      
      <div className="perfil-content">
        <div className="perfil-info">
          <div className="foto-section">
            {editedUser.foto ? (
              <img src={editedUser.foto} alt="Foto de perfil" className="foto-perfilP" />
            ) : (
              <div className="foto-placeholder">
                <User size={40} />
              </div>
            )}
          </div>

          <div className="dados-section">
            <p>
              <strong>Nome:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="nome"
                  value={editedUser.nome}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                editedUser.nome
              )}
            </p>
            <p><strong>CPF:</strong> {editedUser.cpf}</p>
            <p>
              <strong>Gênero:</strong>
              {isEditing ? (
                <select
                  name="genero"
                  value={editedUser.genero}
                  onChange={handleInputChange}
                  className="edit-input"
                >
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Outro">Outro</option>
                </select>
              ) : (
                editedUser.genero
              )}
            </p>
            <p>
              <strong>Email:</strong>
              <span className="flex items-center gap-2">
                <Mail size={16} />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  editedUser.email
                )}
              </span>
            </p>
            <p>
              <strong>Endereço:</strong>
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                {isEditing ? (
                  <div className="endereco-inputs">
                    <input
                      type="text"
                      name="logradouro"
                      value={editedUser.logradouro}
                      onChange={handleInputChange}
                      placeholder="Logradouro"
                      className="edit-input"
                    />
                    <input
                      type="text"
                      name="numero"
                      value={editedUser.numero}
                      onChange={handleInputChange}
                      placeholder="Número"
                      className="edit-input"
                    />
                    <input
                      type="text"
                      name="bairro"
                      value={editedUser.bairro}
                      onChange={handleInputChange}
                      placeholder="Bairro"
                      className="edit-input"
                    />
                    <input
                      type="text"
                      name="cidade"
                      value={editedUser.cidade}
                      onChange={handleInputChange}
                      placeholder="Cidade"
                      className="edit-input"
                    />
                    <input
                      type="text"
                      name="uf"
                      value={editedUser.uf}
                      onChange={handleInputChange}
                      placeholder="UF"
                      className="edit-input"
                    />
                  </div>
                ) : (
                  `${editedUser.logradouro}, Nº ${editedUser.numero}, ${editedUser.bairro}, ${editedUser.cidade} - ${editedUser.uf}`
                )}
              </span>
            </p>
            <p>
              <strong>Complemento:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="complemento"
                  value={editedUser.complemento}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                editedUser.complemento || "Nenhum"
              )}
            </p>
          </div>
        </div>

        <hr className="section-divider" />

        <div className="acessos-rapidos">
          <h2>
            <Grid size={20} />
            Serviços Acessados
          </h2>
          <ul className="servicos-list">
            <li className="servico-item ativo">
              <strong>EducaMais</strong>
              <span>1 matrícula ativa</span>
            </li>
            <li className="servico-item pendente">
              <strong>FomeZero</strong>
              <span>Pedido de cesta básica em andamento</span>
            </li>
            <li className="servico-item">
              <strong>ConectSUS</strong>
              <span>1 consulta agendada</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;