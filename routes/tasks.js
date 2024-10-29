//importacoes
import sequelize from "../config/dataBase.js";
import autheticationToken from "../config/authenticationToken.js";
import User from "../models/user.js";
import Tasks from "../models/tasks.js";
import { createTask } from "../controllers/tasks/add.js";
import express from 'express'
import passport from "passport";

//instanciando router
const router = express.Router();

//aplicando autenticacao
router.use(passport.authenticate('jwt', { session: false }));

//criando rota de criacao
router.post('/api/task/add', autheticationToken, createTask)


//exportando router
export default router



