import { useState} from "react";
import { X, Check } from "lucide-react";
import "./EditarPerfilModal.css";

const EditarPerfilModal = ({ user, setUser, onClose, onSave }) => {

const [alertMessage, setAlertMessage] = useState('');
const [alertType, setAlertType] = useState('');

const showAlert = (message, type = 'success') => {
  setAlertMessage(message);
  setAlertType(type);
  setTimeout(() => {
    setAlertMessage('');
    setAlertType('');
  }, 1000); // Oculta após 3 segundos
};

const handleSave = () => {
  if (!user.nome || !user.email) {
    showAlert("Preencha os campos obrigatórios: Nome e Email.", "error");
    return;
  }
  onSave();
  showAlert("Perfil atualizado com sucesso!", "success");
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlayE">
      {alertMessage && (
  <div className={`alert-box ${alertType}`}>
    {alertMessage}
  </div>
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
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={user.nome}
              onChange={handleChange}
              className="edit-input"
            />
          </div>

          <div className="form-groupE">
            <label>Gênero</label>
            <select
              name="genero"
              value={user.genero}
              onChange={handleChange}
              className="edit-input"
            >
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
              value={user.email}
              onChange={handleChange}
              className="edit-input"
            />
          </div>

          <div className="form-groupE">
  <label>Endereço:</label>
  <br />
  <div className="endereco-inputs">
    <div className="endereco-col">
      <label>Logradouro</label>
      <input
        type="text"
        name="logradouro"
        value={user.logradouro}
        onChange={handleChange}
        className="edit-input"
      />
    </div>
    <div className="endereco-col">
      <label>Número</label>
      <input
        type="text"
        name="numero"
        value={user.numero}
        onChange={handleChange}
        className="edit-input"
      />
    </div>
    <div className="endereco-col">
      <label>Bairro</label>
      <input
        type="text"
        name="bairro"
        value={user.bairro}
        onChange={handleChange}
        className="edit-input"
      />
    </div>
    <div className="endereco-col">
      <label>Cidade</label>
      <input
        type="text"
        name="cidade"
        value={user.cidade}
        onChange={handleChange}
        className="edit-input"
      />
    </div>
    <div className="endereco-col">
      <label>UF</label>
      <input
        type="text"
        name="uf"
        value={user.uf}
        onChange={handleChange}
        className="edit-input"
        maxLength={2}
      />
    </div>
    <div className="endereco-col">
      <label>Complemento</label>
      <input
        type="text"
        name="complemento"
        value={user.complemento}
        onChange={handleChange}
        className="edit-input"
      />
    </div>
  </div>
</div>

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
  );
};

export default EditarPerfilModal;