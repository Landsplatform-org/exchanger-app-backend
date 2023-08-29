"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
const db_1 = __importDefault(require("../config/db"));
class BankAccount {
    getAll(limit, page) {
        return new Promise((resolve, reject) => {
            const offset = +page * +limit;
            const sql = `SELECT * FROM ea_bank_accounts LIMIT ${limit} OFFSET ${offset}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_bank_accounts WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Account was not found");
                resolve(result[0]);
            });
        });
    }
    add(bankAccount) {
        return new Promise((resolve, reject) => {
            const { user_id, currency_id, account } = bankAccount;
            const sql = `
        INSERT INTO ea_bank_accounts 
        (user_id, currency_id, account) 
        VALUES (${user_id}, ${currency_id}, ${account})
      `;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("New account was added");
            });
        });
    }
    update(id, bankAccountBody) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `UPDATE ea_bank_accounts SET ${bankAccountBody} WHERE id=${id}`;
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
                const sql = `DELETE FROM ea_bank_accounts WHERE id=${id}`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("Account was deleted");
                });
            })
                .catch((error) => reject(error));
        });
    }
    find(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_bank_accounts WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Account not found");
                resolve(result[0]);
            });
        });
    }
}
exports.BankAccount = BankAccount;
