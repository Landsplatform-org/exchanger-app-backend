"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
const db_1 = __importDefault(require("../config/db"));
class Currency {
    getAll(limit, page) {
        const offset = +page * +limit;
        return new Promise((resolve, reject) => {
            db_1.default.query("SELECT * FROM ea_gateways LIMIT ? OFFSET ?", [+limit, offset], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            db_1.default.query("SELECT * FROM ea_gateways WHERE id=?", [id], (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Gateway not found");
                resolve(result[0]);
            });
        });
    }
    //Исправить ошибку
    add(body) {
        console.log(body);
        return new Promise((resolve, reject) => {
            db_1.default.query("INSERT INTO ea_gateways (alias, name, value, keywords, image, is_crypto, status) VALUES ?", [body], (err) => {
                if (err)
                    reject(err);
                resolve("New gateway was added");
            });
        });
    }
    update(id, body) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                db_1.default.query("UPDATE ea_gateways SET ? WHERE id=?", [body, id], (err, result) => {
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
                db_1.default.query("DELETE FROM ea_gateways WHERE id=?", [id], (err) => {
                    if (err)
                        reject(err);
                    resolve("Gateway was deleted");
                });
            })
                .catch((error) => reject(error));
        });
    }
    find(id) {
        return new Promise((resolve, reject) => {
            db_1.default.query("SELECT * FROM ea_gateways WHERE id=?", [id], (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Gateway not found");
                resolve("Gateway was found");
            });
        });
    }
}
exports.Currency = Currency;
