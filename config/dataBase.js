// Imports
import express from 'express';
import { Sequelize } from 'sequelize';

// Definindo credenciais
const name = process.env.NAME || 'app_agendamentodb';
const user = process.env.USER || 'postgres';
const password = process.env.PASSWORD || 'sql123';
const host = process.env.HOSTNAME || 'localhost';
const dialect = process.env.DIALECT || 'postgres';
const port = process.env.DB_PORT || "3333"; // testar 3333

// Instanciando a classe Sequelize
const sequelize = new Sequelize(name, user, password, {
    host: host,
    dialect: dialect,
    port: port,
    dialectOptions: { 
        connectTimeout: 60000
    }
});

// Autenticando conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com banco de dados estabelecida com sucesso');
  })
  .catch((err) => {
    console.log('Erro ao conectar ao banco de dados: ', err);
  });

export default sequelize;
