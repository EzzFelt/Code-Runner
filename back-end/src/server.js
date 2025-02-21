import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js'; // Importa as rotas de autenticação
import User from './models/User.js';
import connectDB from './db.js';

dotenv.config({ path: './src/.env' });

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://frontend:5173'], // URLs permitidas para o CORS
  credentials: true
}));
app.use(bodyParser.json()); // Para lidar com JSON no corpo da requisição

// Middleware de autenticação com JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtém o token do cabeçalho Authorization

  if (!token) {
    console.log('Token não fornecido');
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  // Verifica o token usando a chave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token inválido');
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;  // Adiciona o usuário decodificado na requisição
    next();  // Passa para o próximo middleware ou rota
  });
};

// Usando as rotas de autenticação importadas de auth.js
app.use('/api/auth', authRoutes); // Agora todas as rotas do auth.js estarão disponíveis com o prefixo "/api/auth"

// Rota protegida (requere autenticação com token) - Você já tinha essa no server.js
app.get('/api/user', authenticateToken, async (req, res) => {
  console.log("Requisição recebida para /api/user");

  try {
    const user = await User.findById(req.user.userId); // Garante que está buscando pelo ID correto
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Monta o objeto com os dados do usuário
    const userData = {
      name: user.name,
      token: req.headers['authorization']?.split(' ')[1],
      lessonsCompleted: user.lessonsCompleted, // Valor padrão caso esteja ausente
      profilePicture: user.profilePicture, // Adiciona a foto de perfil
    };

    console.log("Dados do usuário encontrados:", userData);
    res.json(userData); // Envia os dados do usuário
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Conectando ao banco de dados e iniciando o servidor
connectDB().then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});
