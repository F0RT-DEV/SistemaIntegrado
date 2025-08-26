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
    if (!editedUser.nome || !editedUser.email) {
      showAlert("Preencha os campos obrigatórios: Nome e Email.", "error");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const userId = editedUser.id;
      const response = await fetch(`http://localhost:3000/pessoas/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUser),
      });
      if (!response.ok) {
        showAlert("Erro ao atualizar perfil!", "error");
        return;
      }
      const updatedUser = await response.json();
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
              {["endereco", "numero", "complemento", "cep"].map((campo) => (
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
