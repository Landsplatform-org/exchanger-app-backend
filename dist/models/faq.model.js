"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQ = void 0;
const db_1 = __importDefault(require("../config/db"));
class FAQ {
    getAll(limit, page) {
        return new Promise((resolve, reject) => {
            const offset = +page * +limit;
            const sql = `SELECT * FROM ea_faq LIMIT ${limit} OFFSET ${offset}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_faq WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("FAQ was not found");
                resolve(result[0]);
            });
        });
    }
    add(faq) {
        return new Promise((resolve, reject) => {
            const { question, answer, category_id, status } = faq;
            const sql = `
        INSERT INTO ea_faq (question, answer, category_id, status) 
        VALUES (${question}, ${answer}, ${category_id}, ${status})
      `;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("New FAQ was added");
            });
        });
    }
    update(id, faqBody) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `UPDATE ea_faq SET ${faqBody} WHERE id=${id}`;
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
                const sql = `DELETE FROM ea_faq WHERE id=${id}`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("FAQ was deleted");
                });
            })
                .catch((error) => reject(error));
        });
    }
    find(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_faq WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("FAQ not found");
                resolve(result[0]);
            });
        });
    }
}
exports.FAQ = FAQ;
