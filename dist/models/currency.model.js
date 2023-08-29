"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
const db_1 = __importDefault(require("../config/db"));
class Currency {
    getAll(limit, page) {
        return new Promise((resolve, reject) => {
            const offset = +page * +limit;
            const sql = `SELECT * FROM ea_currencies LIMIT ${limit} OFFSET ${offset}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_currencies WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Currency not found");
                resolve(result[0]);
            });
        });
    }
    add(currency) {
        return new Promise((resolve, reject) => {
            const { gateway_id, prefix, currency_name, min_amount, max_amount, reserve, default_send, default_receive, status, } = currency;
            const sql = `
        INSERT INTO 
        ea_currencies (gateway_id, prefix, currency, min_amount, max_amount, reserve, default_send, default_receive, status) 
        VALUES (${gateway_id}, ${prefix}, ${currency_name}, ${min_amount}, ${max_amount}, ${reserve}, ${default_send}, ${default_receive}, ${status})
      `;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("New currency was added");
            });
        });
    }
    update(id, currencyBody) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `UPDATE ea_currencies SET ${currencyBody} WHERE id=${id}`;
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
                const sql = `DELETE FROM ea_currencies WHERE id=${id}`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("Currency was deleted");
                });
            })
                .catch((error) => reject(error));
        });
    }
    find(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_currencies WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Currency not found");
                resolve("Currency was found");
            });
        });
    }
}
exports.Currency = Currency;
