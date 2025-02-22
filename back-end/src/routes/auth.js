import express from 'express'; // Importing the express module
import { registerUser, loginUser, getUserData, validateCode } from '../Controllers/authController.js'; // Importing controller functions

const router = express.Router(); // Creating a new router object

// Route for user registration
router.post('/signup', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to get user data
router.get('/user', getUserData);

// Route to validate code
router.post('/validateCode', validateCode);

export default router; // Exporting the router object as the default export
