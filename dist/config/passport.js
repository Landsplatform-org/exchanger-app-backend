"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("./db"));
const passport_local_1 = __importDefault(require("passport-local"));
const localStrategy = passport_local_1.default.Strategy;
// Authentication middleware || связующий компонент аутентификации
module.exports = (passport) => {
    passport.use(new localStrategy((username, password, done) => {
        const getByUsernameQuery = `SELECT * FROM ea_users WHERE username=${username}`;
        db_1.default.query(getByUsernameQuery, (err, result) => {
            if (err)
                throw err;
            if (!result.length)
                return done(null, false, { message: "username does not exists" });
            bcrypt_1.default.compare(password, result[0].password, (err, response) => {
                if (err)
                    throw err;
                if (response) {
                    return done(null, result[0]);
                }
                else {
                    return done(null, false);
                }
            });
        });
    }));
    // User serializing || упорядочивание (складирование) пользователей
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // User deserializing || предоставление пользователей
    passport.deserializeUser((id, done) => {
        const getByIdQuery = `SELECT * FROM ea_users WHERE id=${id}`;
        db_1.default.query(getByIdQuery, (err, result) => {
            if (err)
                throw err;
            const userInfo = {
                id: result[0].id,
                username: result[0].username,
                email: result[0].email,
                isVerified: result[0].is_verified,
                avatarImage: result[0].avatar,
            };
            done(null, userInfo);
        });
    });
};
