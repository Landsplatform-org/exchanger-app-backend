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
exports.setAvatar = exports.changeEmail = exports.checkEMail = exports.changePassword = exports.resetPassword = exports.forgetPassword = exports.verifyMail = exports.refreshJWT = exports.authJWT = exports.registerUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.getUserById = exports.getUsers = void 0;
const generateJWT_1 = require("../utils/generateJWT");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const picode_generator_1 = require("../utils/picode-generator");
const path_1 = __importDefault(require("path"));
const randomstring_1 = __importDefault(require("randomstring"));
const email_1 = require("../helpers/email");
const express_validator_1 = require("express-validator");
dotenv_1.default.config();
const users = new user_model_1.User();
const EXPIRE_TIME = 72 * 60 * 60 * 1000;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? req.query.page : "0";
    const limit = req.query.limit ? req.query.limit : "10";
    const username = req.query.username ? req.query.username : "";
    try {
        const result = yield users.getAll(limit, page, username);
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(404).send({
            status: 404,
            message: error,
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let result;
    try {
        const isUserHasAccounts = yield users.isUserHasAccounts(id);
        if (isUserHasAccounts) {
            result = yield users.getByIdWithMerge(id);
        }
        else {
            result = yield users.getById(id);
        }
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(404).send({
            status: 404,
            message: error,
        });
    }
});
exports.getUserById = getUserById;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyToAdd = req.body;
    if (!bodyToAdd)
        return;
    try {
        const hashedPassword = bcrypt_1.default.hashSync(bodyToAdd.password, 10);
        const result = yield users.add(bodyToAdd, hashedPassword);
        return res.status(201).send({
            status: 201,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.addUser = addUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const bodyToUpdate = req.body;
    const { userToUpdate } = bodyToUpdate;
    if (!userToUpdate)
        return;
    try {
        const result = yield users.update(id, userToUpdate);
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield users.delete(id);
        return res.status(200).send({
            status: 200,
            data: result,
            message: "Successful",
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.deleteUser = deleteUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).send({
            errors: errors.array(),
        });
    const mailSubject = "Mail Verification";
    const randomToken = randomstring_1.default.generate();
    try {
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const result = yield users.register({ username, email, password }, hashedPassword);
        const content = "<p>Hello " +
            username +
            ", please <a href=" +
            process.env.BASE_WEB_URL +
            "mail-verification/?token=" +
            randomToken +
            "&email=" +
            email +
            "> Verify" +
            " " +
            "</a>your mail</p>";
        (0, email_1.sendMail)(email, mailSubject, content);
        yield users.updateToken(randomToken, email);
        return res.status(201).send({
            status: 201,
            data: result,
            message: `Вы были успешно зарегистрированы! Вам было отправлено письмо на почту ${email} для ее подтверждения`,
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.registerUser = registerUser;
const authJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const response = yield users.tryLogIn(username);
        if (response) {
            bcrypt_1.default.compare(password, response.password, (err, same) => {
                if (!same) {
                    return res.status(404).send({
                        status: 404,
                        message: "Неверное имя пользователя или пароль",
                    });
                }
                return res.status(200).send({
                    status: 200,
                    user: response,
                    tokens: {
                        access: (0, generateJWT_1.generateAccessToken)(response),
                        refresh: (0, generateJWT_1.generateRefreshToken)(response)
                    },
                    expiresIn: Date.now() + EXPIRE_TIME
                });
            });
        }
    }
    catch (error) {
        return res.status(404).send({
            status: 404,
            message: error,
        });
    }
});
exports.authJWT = authJWT;
const refreshJWT = (req, res) => {
    const user = req.user;
    return res.status(200).send({
        message: "Обновлены",
        tokens: {
            access: (0, generateJWT_1.generateAccessToken)(user),
            refresh: (0, generateJWT_1.generateRefreshToken)(user)
        }
    });
};
exports.refreshJWT = refreshJWT;
const verifyMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, email } = req.query;
    const PIN = (0, picode_generator_1.generate)(4);
    const hashedPIN = bcrypt_1.default.hashSync(PIN, 10);
    try {
        const result = yield users.verifyMail(token);
        yield users.setPIN(hashedPIN, email);
        return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h1>${result}</h1>
        <h2>Ваш пин-код: ${PIN}, сохраните его для подтверждения операций!</h2>
        <p>Можете закрыть эту страницу</p>
      </body>
      </html>
    `);
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.verifyMail = verifyMail;
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const mailSubject = "Забыли пароль";
    const randomToken = randomstring_1.default.generate();
    try {
        const result = yield users.getByEmail(email);
        const content = "<p>Hello" +
            " " +
            result.username +
            ", please <a href=" +
            process.env.BASE_WEB_URL +
            "reset-password/?token=" +
            randomToken +
            "> Reset " +
            "</a> your password</p>";
        (0, email_1.sendMail)(email, mailSubject, content);
        yield users.updateToken(randomToken, email);
        return res.status(201).send({
            status: 201,
            data: "Письмо отправлено на почту " + email,
            message: "Successful",
        });
    }
    catch (error) {
        res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.forgetPassword = forgetPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    const defaultPassword = bcrypt_1.default.hashSync(process.env.DEFAULT_PASSWORD, 10);
    try {
        yield users.resetPassword(token, defaultPassword);
        return res
            .status(200)
            .sendFile(path_1.default.join(__dirname, "..", "views", "resetPassword.html"));
    }
    catch (error) {
        res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.resetPassword = resetPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    const hashedNewPassword = bcrypt_1.default.hashSync(newPassword, 10);
    try {
        const result = yield users.getOldPassword(id);
        const oldPasswordFromDB = result;
        bcrypt_1.default.compare(oldPassword, oldPasswordFromDB, (error, response) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            if (!response)
                return res.status(400).send({
                    status: 400,
                    message: "Passwords don't match",
                });
            yield users.changePassword(id, hashedNewPassword);
            return res.status(200).send({
                status: 200,
                message: "Password has changed successfully",
            });
        }));
    }
    catch (error) {
        res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.changePassword = changePassword;
const checkEMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldEmail, newEmail } = req.body;
    const token = randomstring_1.default.generate();
    try {
        const result = yield users.checkEmail(newEmail);
        const mailSubject = "Email change";
        const content = "Please <a href=" +
            process.env.BASE_WEB_URL +
            "change-email?token=" +
            token +
            "&oldEmail=" +
            oldEmail +
            "&newEmail=" +
            newEmail +
            "> Click this </a> to confirm that you really want to change your email to new one: " +
            newEmail +
            " </p>";
        (0, email_1.sendMail)(oldEmail, mailSubject, content);
        return res.status(200).send({
            status: 200,
            message: result,
        });
    }
    catch (error) {
        res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.checkEMail = checkEMail;
const changeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oldEmail = req.query.oldEmail;
    const newEmail = req.query.newEmail;
    try {
        const result = yield users.changeEmail(oldEmail, newEmail);
        const mailSubject = "Successful email change";
        const content = "This your new email for exchanger-app";
        (0, email_1.sendMail)(newEmail, mailSubject, content);
        return res
            .status(200)
            .sendFile(path_1.default.join(__dirname, "..", "views", "changedEmail.html"));
    }
    catch (error) {
        res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.changeEmail = changeEmail;
const setAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.file)
        return res.status(404).send({
            status: 404,
            message: "File was not found",
        });
    const file = req.file.filename;
    try {
        const result = yield users.setAvatar(id, file);
        res.status(200).send({
            status: 200,
            message: "Фото профиля было успешно обновлено",
            data: result
        });
    }
    catch (error) {
        res.status(400).send({
            status: 400,
            message: error,
        });
    }
});
exports.setAvatar = setAvatar;
// export const getUser = (req: Request, res: Response) => {
//   res.send(req.user);
// };
