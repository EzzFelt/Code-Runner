import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

// Function to generate JWT token
const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Controller to handle user registration
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    if (await User.findOne({ email })) return res.status(400).json({ msg: 'Usuário já existe!' });

    // Hash the password and save the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({ name, email, password: hashedPassword }).save();

    // Check if JWT secret is defined
    if (!process.env.JWT_SECRET) return res.status(500).json({ msg: 'Chave secreta não definida!' });

    // Respond with success message and token
    res.status(201).json({ msg: 'Usuário registrado!', token: generateToken(newUser._id) });
  } catch (error) {
    // Handle server error
    res.status(500).json({ msg: 'Erro no servidor.', error: error.message });
  }
};

// Controller to handle user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email and compare passwords
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Credenciais inválidas!' });
    }
    // Respond with success message, user name, token, and lessons completed
    res.status(200).json({
      msg: 'Login bem-sucedido!',
      name: user.name,
      token: generateToken(user._id),
      lessonsCompleted: user.lessonsCompleted,
    });
  } catch (error) {
    // Handle server error
    res.status(500).json({ msg: 'Erro no servidor.' });
  }
};

// Controller to get user data
export const getUserData = async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'Token não fornecido.' });

    // Verify token and find user by ID
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado.' });

    // Respond with user data
    res.status(200).json({ name: user.name, lessonsCompleted: user.lessonsCompleted });
  } catch (error) {
    // Handle error
    res.status(500).json({ msg: 'Erro ao buscar dados.', error: error.message });
  }
};

// Controller to validate code
export const validateCode = async (req, res) => {
  const { code } = req.body;
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  try {
    // Verify token and get user ID
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const expectedFunctions = {
      1: 'function sum(a,b){return a+b;}',
      2: 'function multiply(a,b){return a*b;}',
      3: 'function sumArray(numbers){let total=0;for(let i=0;i<numbers.length;i++){total+=numbers[i];}return total;}'
    };

    // Normalize code to compare
    const normalizeCode = (str) => str.replace(/\s+/g, '').trim();
    const normalizedReceived = normalizeCode(code);

    // Find matching exercise ID
    let matchedExerciseId = Object.entries(expectedFunctions)
      .find(([_, expected]) => normalizedReceived === normalizeCode(expected))?.[0];

    if (!matchedExerciseId) {
      return res.status(400).json({ message: 'Código incorreto.' });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    matchedExerciseId = Number(matchedExerciseId);
    // Check if exercise is already completed
    if (user.completedExercises.includes(matchedExerciseId)) {
      return res.status(400).json({ message: 'Exercício já completado.' });
    }

    // Update user data and save
    user.completedExercises.push(matchedExerciseId);
    user.lessonsCompleted += 1;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: 'Código correto!', lessonsCompleted: user.lessonsCompleted });
  } catch (error) {
    // Handle error
    res.status(500).json({ message: 'Erro ao processar código.', error: error.message });
  }
};
