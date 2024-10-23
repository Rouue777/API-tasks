//imports
import express from 'express';
import { Sequelize } from 'sequelize';

//definindo credenciais
const name = "APITasks" || process.env.NAME;
const user = "root" || process.env.USER;
const password = 'sql123' || process.env.PASSWORD;
const host = 'localhost' || process.env.HOSTNAME;
const dialect = "mysql" || process.env.DIALECT;
const port = '3306' || process.env.PORT;


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

