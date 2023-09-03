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
module.exports = function (passport) {
    passport.use(new localStrategy(function (username, password, done) {
        const getByUsernameQuery = `SELECT * FROM ea_users WHERE username='${username}'`;
        db_1.default.query(getByUsernameQuery, function (err, result) {
            if (err)
                throw err;
            if (!result.length)
                return done(null, false, {
                    message: "Пользователя с таким именем не существует",
                });
            bcrypt_1.default.compare(password, result[0].password, function (err, response) {
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
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // User deserializing || предоставление пользователей
    passport.deserializeUser(function (id, done) {
        const getByIdQuery = `SELECT * FROM ea_users INNER JOIN ea_bank_accounts ON ea_users.id=ea_bank_accounts.user_id WHERE ea_users.id='${id}'`;
        db_1.default.query(getByIdQuery, (err, result) => {
            if (err)
                throw err;
            const user = result;
            done(null, user);
        });
    });
};
