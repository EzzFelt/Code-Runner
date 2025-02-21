import express from 'express';
import { registerUser, loginUser, getUserData, validateCode } from '../Controllers/authController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/user', getUserData);
router.post('/validateCode', validateCode);

export default router;
