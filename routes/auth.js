//importações
import express from 'express';
import sequelize from '../config/dataBase.js';
import { registerUser } from '../controllers/auth/register.js';
import { loginFunction } from '../controllers/auth/login.js';
import { returnUserData } from '../controllers/auth/me.js';
import autheticationToken from '../config/authenticationToken.js';

//instanciando o metodo router
const router = express.Router();

//rota de registro
router.post("/api/auth/register", registerUser)

//rota de login
router.post("/api/auth/login", loginFunction)

//rota que retorna os dados de usuario
router.get("/api/auth/me", autheticationToken, returnUserData)

export default router; 


