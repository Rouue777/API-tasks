//importacoes
import sequelize from "../config/dataBase.js";
import autheticationToken from "../config/authenticationToken.js";
import User from "../models/user.js";
import Tasks from "../models/tasks.js";
import { createTask } from "../controllers/tasks/add.js";
import { showTasks } from "../controllers/tasks/showTaskUser.js";
import { updateTasks } from "../controllers/tasks/update.js";
import { deleteTasks } from "../controllers/tasks/deleteTasks.js";
import { checkTask } from "../controllers/tasks/completedTasks.js";
import { verifyTokenBlackList } from "../config/verifyTokenInBlackList.js";
import express from 'express'
import passport from "passport";


//instanciando router
const router = express.Router();

//aplicando autenticacao
router.use(passport.authenticate('jwt', { session: false }));

//criando rota de criacao
router.post('/api/task/add', autheticationToken, verifyTokenBlackList ,createTask)

//criando rota para exibir tasks
router.get('/api/task/user', autheticationToken, verifyTokenBlackList ,showTasks)

//criando rota para atualizar tasks
router.post('/api/task/update/:id', autheticationToken, verifyTokenBlackList ,updateTasks)

//criando rota para deletar tasks
router.post('/api/task/delete/:id', autheticationToken, verifyTokenBlackList ,deleteTasks)

//criando rota para marcar checkbox
router.post("/api/task/complete/:id", autheticationToken, verifyTokenBlackList,checkTask)

//exportando router
export default router



