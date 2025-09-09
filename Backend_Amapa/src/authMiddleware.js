import jwt from 'jsonwebtoken';

export const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Não autorizado - Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.usuario = decoded;
    
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