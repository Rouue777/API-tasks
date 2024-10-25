import User from "../../models/user.js";
import Tasks from "../../models/tasks.js";
import sequelize from "../../config/dataBase.js";
import express from 'express';
import Joi from "joi";
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    try { //validar os dados 
        //definindo esquema de validacao
        const userSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        });
        //funcao de validacao
        const { error } = userSchema.validate(req.body);
        //verificando se o email ja existe no database
        const emailValidacao = await User.findOne({ where: { email: req.body.email } })

        if (error || emailValidacao) {
            return res.status(400).json({ message: "Seus dados de entradas são invalidos, reveja os dados e tente novamente" })
        }

        //hashear senha 
        //criacao do salt
        const salt = await bcrypt.genSalt(10);

        //hashear senha
        const passwordHashed = await bcrypt.hash(req.body.password, salt)
        if(!passwordHashed){
            throw {message: "Erro ao hashear senha", type: 'hash_error'}
        }

        //salvando dados na database
        const newUser = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : passwordHashed
        })

        //retornando mensagem de sucesso 201
        return res.status(201).json({message: "Usuario regitrado com successo", user: {
            id : newUser.id,
            nome : newUser.name
        }})

    } catch (error) {
        if(error.type === "hash_error"){
            return res.status(500).json({message: "erro no hasheamento"})
        }

        return res.status(500).json({message: "erro interno", error: error.message})
    }
}