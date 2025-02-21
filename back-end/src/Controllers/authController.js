import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email })) return res.status(400).json({ msg: 'Usuário já existe!' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({ name, email, password: hashedPassword }).save();
    
    if (!process.env.JWT_SECRET) return res.status(500).json({ msg: 'Chave secreta não definida!' });
    
    res.status(201).json({ msg: 'Usuário registrado!', token: generateToken(newUser._id) });
  } catch (error) {
    res.status(500).json({ msg: 'Erro no servidor.', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Credenciais inválidas!' });
    }
    res.status(200).json({
      msg: 'Login bem-sucedido!',
      name: user.name,
      token: generateToken(user._id),
      lessonsCompleted: user.lessonsCompleted,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Erro no servidor.' });
  }
};

export const getUserData = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'Token não fornecido.' });

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado.' });

    res.status(200).json({ name: user.name, lessonsCompleted: user.lessonsCompleted });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao buscar dados.', error: error.message });
  }
};

export const validateCode = async (req, res) => {
  const { code } = req.body;
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const expectedFunctions = {
      1: 'function sum(a,b){return a+b;}',
      2: 'function multiply(a,b){return a*b;}',
      3: 'function sumArray(numbers){let total=0;for(let i=0;i<numbers.length;i++){total+=numbers[i];}return total;}'
    };

    const normalizeCode = (str) => str.replace(/\s+/g, '').trim();
    const normalizedReceived = normalizeCode(code);
    
    let matchedExerciseId = Object.entries(expectedFunctions)
      .find(([_, expected]) => normalizedReceived === normalizeCode(expected))?.[0];
    
    if (!matchedExerciseId) {
      return res.status(400).json({ message: 'Código incorreto.' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    matchedExerciseId = Number(matchedExerciseId);
    if (user.completedExercises.includes(matchedExerciseId)) {
      return res.status(400).json({ message: 'Exercício já completado.' });
    }

    user.completedExercises.push(matchedExerciseId);
    user.lessonsCompleted += 1;
    await user.save();

    res.status(200).json({ message: 'Código correto!', lessonsCompleted: user.lessonsCompleted });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar código.', error: error.message });
  }
};
