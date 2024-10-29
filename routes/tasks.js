//importacoes
import sequelize from "../config/dataBase.js";
import autheticationToken from "../config/authenticationToken.js";
import User from "../models/user.js";
import Tasks from "../models/tasks.js";
import { createTask } from "../controllers/tasks/add.js";
import { showTasks } from "../controllers/tasks/showTaskUser.js";
import { updateTasks } from "../controllers/tasks/update.js";
import express from 'express'
import passport from "passport";

//instanciando router
const router = express.Router();

//aplicando autenticacao
router.use(passport.authenticate('jwt', { session: false }));

//criando rota de criacao
router.post('/api/task/add', autheticationToken, createTask)

//criando rota para exibir tasks
router.get('/api/task/user', autheticationToken, showTasks)

//criando rota para atualizar tasks
router.post('/api/task/update/:id', autheticationToken, updateTasks)

//exportando router
export default router



