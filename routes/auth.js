//importações
import express from 'express';
import sequelize from '../config/dataBase.js';
import { registerUser } from '../controllers/auth/register.js';
import { loginFunction } from '../controllers/auth/login.js';
import { returnUserData } from '../controllers/auth/me.js';
import autheticationToken from '../config/authenticationToken.js';
import { verifyTokenBlackList } from '../config/verifyTokenInBlackList.js';
import { logOut } from '../controllers/auth/logout.js';

//instanciando o metodo router
const router = express.Router();

//criando
router.get('', (req, res) => {
    console.log('Acessando a rota raiz');
    res.send('API está funcionando!');
})

//rota de registro
router.post("/api/auth/register", registerUser)

//rota de login
router.post("/api/auth/login", loginFunction)

//rota de logout
router.post("/api/auth/logout", autheticationToken, verifyTokenBlackList, logOut) 

//rota que retorna os dados de usuario
router.get("/api/auth/me", autheticationToken, verifyTokenBlackList ,returnUserData)

export default router; 


