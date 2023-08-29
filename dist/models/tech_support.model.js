"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechSupport = void 0;
const db_1 = __importDefault(require("../config/db"));
class TechSupport {
    getAllSupportMessages(limit, page) {
        return new Promise((resolve, reject) => {
            const offset = +page * +limit;
            const sql = `SELECT * FROM ea_techsupport LIMIT ${limit} OFFSET ${offset}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getSupportMessage(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_techsupport WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Message was not found");
                resolve(result[0]);
            });
        });
    }
    add(message) {
        return new Promise((resolve, reject) => {
            const { user_id, user_email, text, image } = message;
            const sql = `
        INSERT INTO ea_techsupport (user_id, user_email, text, image) 
        VALUES (${user_id}, ${user_email}, ${text}, ${image})
      `;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("New message was added");
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `DELETE FROM ea_techsupport WHERE id=${id}`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("Message was deleted");
                });
            })
                .catch((error) => reject(error));
        });
    }
    find(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_users WHERE id=${id}`;
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
exports.TechSupport = TechSupport;
