// PerfilUsuario.jsx (corrigido)
import React, { useState, useEffect } from "react";
import "./PerfilUsuario.css";
import { User, Grid, Pencil } from "lucide-react";
import EditarPerfilModal from "../components/EditarPerfilModal";

const PerfilUsuario = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedUser = JSON.parse(localStorage.getItem("userData"));
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }
  }, []);

  const servicos = [
    { nome: "EducaMais", status: "ativo", desc: "1 matrícula ativa" },
    { nome: "FomeZero", status: "pendente", desc: "Pedido de cesta básica em andamento" },
    { nome: "ConectSUS", status: "agendado", desc: "1 consulta agendada" }
  ];

  const handleSave = () => {
    setIsModalOpen(false);
    // Aqui você poderia atualizar os dados no localStorage se o perfil for editado
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
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Telefone:</strong> {user.telefone}</p>
            <p><strong>Data de Nascimento:</strong> {user.data_nascimento}</p>
            <p><strong>Endereço:</strong> {`${user.endereco}, Nº ${user.numero}, ${user.complemento}, ${user.cep}`}</p>
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
