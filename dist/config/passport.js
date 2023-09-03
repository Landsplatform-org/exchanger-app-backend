"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("./db"));
const passport_local_1 = __importDefault(require("passport-local"));
const localStrategy = passport_local_1.default.Strategy;
const users = new user_model_1.User();
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
        return __awaiter(this, void 0, void 0, function* () {
            const isUserHasAccounts = yield users.isUserHasAccounts(id);
            let result;
            if (isUserHasAccounts) {
                result = yield users.getByIdWithMerge(id);
            }
            else {
                result = yield users.getById(id);
            }
            const user = result;
            done(null, user);
        });
    });
};
