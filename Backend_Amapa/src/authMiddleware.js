import jwt from 'jsonwebtoken';


export const autenticar = (req, res, next) => {
  // 1. Extrair o token do cabeçalho Authorization
  const authHeader = req.headers.authorization;
  
  // 2. Verificar se o token existe
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Não autorizado - Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 3. Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Adicionar os dados do usuário à requisição
    req.usuario = decoded;
    
    // 5. Permitir o acesso à rota
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        mensagem: 'Token expirado',
        code: 'TOKEN_EXPIRED'
      });
    }
    return res.status(500).json({ mensagem: 'Erro na autenticação' });
  }
};