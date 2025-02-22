import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js'; // Import authentication routes
import User from './models/User.js'; // Import User model
import connectDB from './db.js'; // Import database connection function

dotenv.config({ path: './src/.env' }); // Load environment variables from .env file

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log the JWT secret for debugging

const app = express(); // Create an Express application

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://frontend:5173'], // Allowed URLs for CORS
  credentials: true
}));
app.use(bodyParser.json()); // Middleware to handle JSON in request body

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    console.log('Token não fornecido'); // Log if token is not provided
    return res.status(403).json({ message: 'Token não fornecido' }); // Respond with 403 if no token
  }

  // Verify token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token inválido'); // Log if token is invalid
      return res.status(403).json({ message: 'Token inválido' }); // Respond with 403 if token is invalid
    }
    req.user = user;  // Add decoded user to request
    next();  // Pass to the next middleware or route
  });
};

// Use imported authentication routes with prefix "/api/auth"
app.use('/api/auth', authRoutes);

// Protected route (requires token authentication)
app.get('/api/user', authenticateToken, async (req, res) => {
  console.log("Requisição recebida para /api/user"); // Log request to /api/user

  try {
    const user = await User.findById(req.user.userId); // Ensure correct ID is used
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' }); // Respond with 404 if user not found
    }

    // Construct user data object
    const userData = {
      name: user.name,
      token: req.headers['authorization']?.split(' ')[1],
      lessonsCompleted: user.lessonsCompleted, // Default value if absent
      profilePicture: user.profilePicture, // Add profile picture
    };

    console.log("Dados do usuário encontrados:", userData); // Log found user data
    res.json(userData); // Send user data
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error.message); // Log error
    res.status(500).json({ message: 'Erro no servidor' }); // Respond with 500 if server error
  }
});

// Connect to database and start server
connectDB().then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`); // Log server running
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err); // Log database connection error
  process.exit(1); // Exit process if connection fails
});
