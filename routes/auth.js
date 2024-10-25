//importações
import express from 'express';
import sequelize from '../config/dataBase.js';
import { registerUser } from '../controllers/auth/register.js';

//instanciando o metodo router
const router = express.Router();

//rota de registro
router.post("/api/task/add", registerUser)

export default router; 


