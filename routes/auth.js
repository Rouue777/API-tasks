//importações
import express from 'express';
import sequelize from '../config/dataBase.js';
import { registerUser } from '../controllers/auth/register.js';
import { loginFunction } from '../controllers/auth/login.js';

//instanciando o metodo router
const router = express.Router();

//rota de registro
router.post("/api/auth/register", registerUser)

//rota de login
router.post("/api/auth/login", loginFunction)

export default router; 


