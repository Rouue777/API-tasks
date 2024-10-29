//imports
import express from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';;
import User from '../models/user.js';

//configuracao para usar jwt
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey:  'you_jwt_secret'
}

// Configura o Passport para usar a estratégia JWT
const configPassport = (passport) => {
passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        // Encontre o usuário pelo ID contido no payload do JWT
        const user = await User.findOne({where:{id : jwtPayload.id}});
        if (user) {
            return done(null, user); // Usuário encontrado
        }
        return done(null, false); // Usuário não encontrado
    } catch (error) {
        return done(error, false); // Erro ao buscar usuário
    }
}));
}
export default configPassport;
