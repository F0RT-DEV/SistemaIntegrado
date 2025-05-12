const API_BASE_URL = 'http://localhost:3000';

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.mensagem || 'Erro na requisição');
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
};