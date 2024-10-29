//Projeto api tasks
///importacoes
import express from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import Joi from 'joi';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import sequelize from './config/dataBase.js';
import User from './models/user.js'
import Tasks from './models/tasks.js';
import './models/association.js';
import { registerUser } from './controllers/auth/register.js';
import auth from './routes/auth.js';
import taskRoute from './routes/tasks.js'
import { loginFunction } from './controllers/auth/login.js';
import configPassport from './config/passportConfig.js'

//intanciando express
const app = express();

//configuracao passport
configPassport(passport)

//configurando midleewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

//rotas
app.use('/', auth)
app.use('/', taskRoute )


//iniciando server 
const PORT = 3333 || process.env.PORT;
app.listen(PORT, ()=>{
    console.log('Servidor rodando na porta ' + PORT + 'http://localhost3333')
})


