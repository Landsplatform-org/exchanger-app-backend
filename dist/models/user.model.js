"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = __importDefault(require("../config/db"));
class User {
    getAll(limit, page, username) {
        return new Promise((resolve, reject) => {
            const offset = +page * +limit;
            const sql = `SELECT * FROM ea_users WHERE username LIKE '${username}%' LIMIT ${limit} OFFSET ${offset}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_users INNER JOIN ea_bank_accounts ON ea_users.id=ea_bank_accounts.user_id WHERE ea_users.id='${id}'`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result)
                    reject("User was not found");
                resolve(result);
            });
        });
    }
    getByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_users WHERE id='${email}'`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("User was not found");
                resolve(result[0]);
            });
        });
    }
    add(user, password) {
        return new Promise((resolve, reject) => {
            const { ref_id, username, firstname, lastname, email, ref_fee_type, ref_fee, role_id, status_id } = user;
            const sql = `
        INSERT INTO ea_users (ref_id, username, firstname, lastname, email, password, ref_fee_type, ref_fee, role_id, status_id) 
        VALUES ('${ref_id}', '${username}', '${firstname}', '${lastname}', '${email}', '${password}', '${ref_fee_type}', '${ref_fee}', '${role_id}', '${status_id}')
      `;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("New user was added");
            });
        });
    }
    update(id, userBody) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `UPDATE ea_users SET '${userBody}' WHERE id='${id}'`;
                db_1.default.query(sql, (err, result) => {
                    if (err)
                        reject(err);
                    resolve(result);
                });
            })
                .catch((error) => reject(error));
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `DELETE FROM ea_users WHERE id='${id}'`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("User was deleted");
                });
            })
                .catch((error) => reject(error));
        });
    }
    register(user, password) {
        return new Promise((resolve, reject) => {
            const { username, email } = user;
            this.isUserExist(username, email)
                .then(() => {
                const sql = `INSERT INTO ea_users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("Пользователь был успешно зарегистрирован!");
                });
            })
                .catch((error) => reject(error));
        });
    }
    updateToken(token, email) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ea_users SET token='${token}' WHERE email='${email}'`;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("Token was updated");
            });
        });
    }
    verifyMail(token) {
        return new Promise((resolve, reject) => {
            this.getToken(token)
                .then((id) => {
                const sql = `UPDATE ea_users SET token=NULL, is_verified=1 WHERE id='${id}'`;
                db_1.default.query(sql, () => {
                    resolve("Email was verified");
                });
            })
                .catch((error) => reject(error));
        });
    }
    setPIN(pin, email) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ea_users SET pin='${pin}' WHERE email='${email}'`;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("PIN was created");
            });
        });
    }
    getOldPassword(id) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then((user) => {
                const password = user.password;
                resolve(password);
            })
                .catch((error) => reject(error));
        });
    }
    changePassword(id, password) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ea_users SET password='${password}' WHERE id='${id}'`;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("User has changed password");
            });
        });
    }
    checkEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_users WHERE email='${email}'`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (result[0])
                    reject("This email already exist");
                resolve("You can use this email");
            });
        });
    }
    changeEmail(oldEmail, newEmail) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ea_users SET email=${newEmail} WHERE email=${oldEmail}`;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("User has changed email");
            });
        });
    }
    resetPassword(token, defaultPassword) {
        return new Promise((resolve, reject) => {
            this.getToken(token)
                .then((id) => {
                const sql = `UPDATE ea_users SET token=NULL, password='${defaultPassword}' WHERE id='${id}'`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("Password was reset successfully");
                });
            })
                .catch((error) => reject(error));
        });
    }
    setAvatar(id, avatar) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `UPDATE ea_users SET avatar='${avatar}' WHERE id='${id}'`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("User avatar was updated successfully");
                });
            })
                .catch((error) => reject(error));
        });
    }
    isUserExist(username, email) {
        const checkUsername = new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_users WHERE username='${username}'`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (result[0])
                    reject("Пользователь с таким имененем пользователя уже существует");
                resolve("Это имя пользователя свободно");
            });
        });
        const checkEmail = new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_users WHERE email='${email}'`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (result[0])
                    reject("Пользователь с такой почтой уже существует");
                resolve("Эта почта доступна для регистрации");
            });
        });
        return Promise.all([checkUsername, checkEmail]);
    }
    getToken(token) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_users WHERE token='${token}'`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result.length)
                    return reject("Token has expired");
                resolve(result[0].id);
            });
        });
    }
    find(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_users WHERE id='${id}'`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("User not found");
                resolve(result[0]);
            });
        });
    }
}
exports.User = User;
