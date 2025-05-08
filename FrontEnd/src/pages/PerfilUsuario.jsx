import React, { useState, useEffect } from "react";
import "./PerfilUsuario.css";
import { User, Mail, MapPin, Grid, Pencil } from "lucide-react";
import EditarPerfilModal from "../components/EditarPerfilModal";

const PerfilUsuario = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});

  // Carregar dados do localStorage ao montar o componente
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userData"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const servicos = [
    { nome: "EducaMais", status: "ativo", desc: "1 matrícula ativa" },
    { nome: "FomeZero", status: "pendente", desc: "Pedido de cesta básica em andamento" },
    { nome: "ConectSUS", status: "agendado", desc: "1 consulta agendada" }
  ];

  const handleSave = () => {
    setIsModalOpen(false);
    // Lógica de salvar no backend pode ser adicionada aqui
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h1><User size={24} /> Meu Perfil</h1>
        <button className="edit-button" onClick={() => setIsModalOpen(true)}>
          <Pencil size={16} /> Editar
        </button>
      </div>
      
      <div className="perfil-content">
        <div className="perfil-info">
          <div className="foto-section">
            {user.foto ? (
              <img src={user.foto} alt="Foto de perfil" className="foto-perfilP" />
            ) : (
              <div className="foto-placeholder"><User size={40} /></div>
            )}
          </div>

          <div className="dados-section">
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>CPF:</strong> {user.cpf}</p>
            <p><strong>Gênero:</strong> {user.genero}</p>
            <p><strong>Email:</strong> <span className="flex items-center gap-2">{user.email}</span></p>
            <p><strong>Endereço:</strong>
              <span className="flex items-center gap-2">
                {`${user.logradouro}, Nº ${user.numero}, ${user.bairro}, ${user.complemento}, ${user.cidade} - ${user.uf}`}
              </span>
            </p>
          </div>
        </div>

        <hr className="section-divider" />

        <div className="acessos-rapidos">
          <h2><Grid size={20} /> Serviços Acessados</h2>
          <ul className="servicos-list">
            {servicos.map(servico => (
              <li key={servico.nome} className={`servico-item ${servico.status}`}>
                <strong>{servico.nome}</strong>
                <span>{servico.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isModalOpen && (
        <EditarPerfilModal
          user={user}
          setUser={setUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default PerfilUsuario;
