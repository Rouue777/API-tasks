//imports
import express from 'express';
import { Sequelize } from 'sequelize';

//definindo credenciais
const name =  process.env.NAME || 'apitasks'
const user =  process.env.USER || 'admin' ;
const password =  process.env.PASSWORD || 'mysql123'
const host =  process.env.HOSTNAME || 'databaseawstest.czsywmyi22r7.us-east-1.rds.amazonaws.com'
const dialect =  process.env.DIALECT || 'mysql' ;
const port =  process.env.DB_PORT || '3306';


//instanciando a classe Sequelize
const sequelize = new Sequelize(name, user, password, {
    host : host,
    dialect : dialect,
    port : port,
    dialectOptions: {
        connectTimeout: 60000
    }
});

//autenticando conexao
sequelize.authenticate().then(() =>{
  console.log('Conexão com banco de dados estabelecida com sucesso')
}).catch((err) =>{
 console.log('Erro ao conectar ao db ' + err)
});

export default sequelize;

