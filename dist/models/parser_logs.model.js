"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserLog = void 0;
const db_1 = __importDefault(require("../config/db"));
class ParserLog {
    getAll(limit, page) {
        return new Promise((resolve, reject) => {
            const offset = +page * +limit;
            const sql = `SELECT * FROM ea_parser_logs LIMIT ${limit} OFFSET ${offset}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_parser_logs WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Parser-log not found");
                resolve(result[0]);
            });
        });
    }
    add(parserLog) {
        return new Promise((resolve, reject) => {
            const { name, parsing_status, parsing_update } = parserLog;
            const sql = `
        INSERT INTO ea_parser_logs (name, parsing_status, parsing_update) 
        VALUES (${name}, ${parsing_status}, ${parsing_update})
      `;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("New parser-log was added");
            });
        });
    }
    update(id, parserLogBody) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `UPDATE ea_parser_logs SET ${parserLogBody} WHERE id=${id}`;
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
                const sql = `DELETE FROM ea_parser_logs WHERE id=${id}`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("Parser-log was deleted");
                });
            })
                .catch((error) => reject(error));
        });
    }
    find(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_parser_logs WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Parser-log not found");
                resolve("Parser-log was found");
            });
        });
    }
}
exports.ParserLog = ParserLog;
