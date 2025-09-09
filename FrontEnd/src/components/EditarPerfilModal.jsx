import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import "./EditarPerfilModal.css";

const EditarPerfilModal = ({ user, setUser, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Lista de campos obrigatórios
    const obrigatorios = ["nome", "cpf", "email", "data_nascimento", "endereco", "numero", "cep", "cidade", "uf", "bairro"];
    for (const campo of obrigatorios) {
      const valor = editedUser[campo];
      if (valor === undefined || valor === null || (typeof valor === "string" && valor.trim() === "")) {
        showAlert(`Preencha o campo obrigatório: ${campo.replace('_', ' ')}.`, "error");
        return;
      }
    }
    try {
      const token = localStorage.getItem("token");
      const userId = editedUser.id;
      // Garante que todos os campos obrigatórios vão para o backend
      const payload = { ...editedUser };
      obrigatorios.forEach(campo => {
        if (!(campo in payload)) payload[campo] = "";
      });
      const response = await fetch(`https://sistemaintegrado.onrender.com/pessoas/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        showAlert("Erro ao atualizar perfil!", "error");
        return;
      }
      const updatedUser = await response.json();
      // Garante que todos os campos obrigatórios estejam presentes no localStorage
      obrigatorios.forEach(campo => {
        if (!(campo in updatedUser)) updatedUser[campo] = payload[campo];
      });
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      setUser(updatedUser);
      onSave();
      showAlert("Perfil atualizado com sucesso!", "success");
    } catch (error) {
      showAlert("Erro ao atualizar perfil!", "error");
    }
  };

  return (
    <div className="modal-overlayE">
      {alertMessage && (
        <div className={`alert-box ${alertType}`}>{alertMessage}</div>
      )}
      <div className="modal-contentE">
        <div className="modal-headerE">
          <h2>Editar Perfil</h2>
          <button onClick={onClose} className="modal-closeE">
            <X size={20} />
          </button>
        </div>
        <div className="modal-bodyE">
          <div className="form-groupE">
            <label>Foto de Perfil (URL)</label>
            <input
              type="text"
              name="foto"
              value={editedUser.foto || ""}
              onChange={handleChange}
              className="edit-input"
            />
            {editedUser.foto && (
              <div className="foto-preview">
                <img
                  src={editedUser.foto}
                  alt="Prévia da foto"
                  className="preview-img"
                />
              </div>
            )}
          </div>
          <div className="form-groupE">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={editedUser.nome || ""}
              onChange={handleChange}
              className="edit-input"
            />
          </div>
          <div className="form-groupE">
            <label>Gênero</label>
            <select
              name="genero"
              value={editedUser.genero || ""}
              onChange={handleChange}
              className="edit-input"
            >
              <option value="">Selecione</option>
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div className="form-groupE">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={editedUser.email || ""}
              onChange={handleChange}
              className="edit-input"
            />
          </div>
          <div className="form-groupE">
            <label>Endereço:</label>
            <div className="endereco-inputs">
              {["cep", "uf", "cidade", "bairro", "endereco", "numero", "complemento"].map((campo) => (
                <div className="endereco-col" key={campo}>
                  <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
                  <input
                    type="text"
                    name={campo}
                    value={editedUser[campo] || ""}
                    onChange={handleChange}
                    className="edit-input"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="form-groupE">
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              value={editedUser.cpf || ""}
              onChange={handleChange}
              className="edit-input"
              maxLength={14}
            />
          </div>
          <div className="form-groupE">
            <label>Dependente ou Responsável</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                name="e_dependente"
                checked={!!editedUser.e_dependente}
                onChange={e => setEditedUser(prev => ({ ...prev, e_dependente: e.target.checked }))}
                style={{ width: '22px', height: '22px', accentColor: '#6c63ff' }}
              />
              <span style={{ fontSize: '0.98em', color: '#333' }}>
                Marque se você é <b>dependente</b> (filho, tutelado, etc). Desmarcado indica <b>responsável</b> (pai, mãe, tutor).
              </span>
            </div>
          </div>
          <div className="form-groupE">
            <label>Telefone</label>
            <input
              type="text"
              name="telefone"
              value={editedUser.telefone || ""}
              onChange={handleChange}
              className="edit-input"
            />
          </div>
          <div className="form-groupE">
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="data_nascimento"
              value={editedUser.data_nascimento || ""}
              onChange={handleChange}
              className="edit-input"
            />
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="cancel-buttonE">
              Cancelar
            </button>
            <button onClick={handleSave} className="save-buttonE">
              <Check size={16} className="iconSave" /> Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfilModal;
