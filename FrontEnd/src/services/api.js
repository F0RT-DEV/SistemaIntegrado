// Alterna entre local e produção automaticamente
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://sistemaintegrado.onrender.com');

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || 'Erro na requisição');
    error.response = data;
    throw error;
  }
  
  return data;
};

export const api = {
  cadastrarUsuario: async (usuarioData) => {
    const response = await fetch(`${API_BASE_URL}/pessoas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioData),
    });
    return handleResponse(response);
  },
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/pessoas/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },
  validarCPF: async (cpf) => {
    const response = await fetch(`${API_BASE_URL}/pessoas/validar-cpf?cpf=${cpf}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },
};

