"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserPair = void 0;
const db_1 = __importDefault(require("../config/db"));
class ParserPair {
    getAll(limit, page) {
        return new Promise((resolve, reject) => {
            const offset = +page * +limit;
            const sql = `SELECT * FROM ea_parser_pairs_data LIMIT ${limit} OFFSET ${offset}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getAllBySourceId(sourceId) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_parser_pairs_data WHERE parse_source_id=${sourceId}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result.length)
                    reject("Parser-pairs not found");
                resolve(result);
            });
        });
    }
    add(parserPair) {
        return new Promise((resolve, reject) => {
            const { parse_source_id, parse_title, parse_pair, parse_nominal, parse_course, parse_code } = parserPair;
            const sql = `
        INSERT INTO ea_parser_pairs_data (parse_source_id, parse_title, parse_pair, parse_nominal, parse_course, parse_code) 
        VALUES (${parse_source_id}, ${parse_title}, ${parse_pair}, ${parse_nominal}, ${parse_course}, ${parse_code})
      `;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("New parser-pair was added");
            });
        });
    }
    update(id, parserPairBody) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `UPDATE ea_parser_pairs_data SET ${parserPairBody} WHERE id=${id}`;
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
                const sql = `DELETE FROM ea_parser_pairs_data WHERE id=${id}`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("Parser-pair was deleted");
                });
            })
                .catch((error) => reject(error));
        });
    }
    find(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_parser_pairs_data WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Parser-pair not found");
                resolve("Parser-pair was found");
            });
        });
    }
}
exports.ParserPair = ParserPair;
