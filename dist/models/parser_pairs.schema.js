"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserPair = void 0;
const db_1 = __importDefault(require("../config/db"));
class ParserPair {
    getAll(limit, page) {
        const offset = +page * +limit;
        return new Promise((resolve, reject) => {
            db_1.default.query("SELECT * FROM ea_parser_pairs_data LIMIT ? OFFSET ?", [+limit, offset], (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getAllBySourceId(sourceId) {
        return new Promise((resolve, reject) => {
            db_1.default.query("SELECT * FROM ea_parser_pairs_data WHERE parse_source_id=?", [sourceId], (err, result) => {
                if (err)
                    reject(err);
                if (!result.length)
                    reject("Parser-pairs not found");
                resolve(result);
            });
        });
    }
    add(body) {
        return new Promise((resolve, reject) => {
            db_1.default.query("INSERT INTO ea_parser_pairs_data (parse_source_id, parse_title, parse_pair, parse_nominal, parse_course, parse_code) VALUES (?, ?, ?, ?, ?, ?)", [
                body.parse_source_id,
                body.parse_title,
                body.parse_pair,
                body.parse_nominal,
                body.parse_course,
                body.parse_code
            ], (err) => {
                if (err)
                    reject(err);
                resolve("New parser-pair was added");
            });
        });
    }
    update(id, body) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                db_1.default.query("UPDATE ea_parser_pairs_data SET ? WHERE id=?", [body, id], (err, result) => {
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
                db_1.default.query("DELETE FROM ea_parser_pairs_data WHERE id=?", [id], (err) => {
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
            db_1.default.query("SELECT * FROM ea_parser_pairs_data WHERE id=?", [id], (err, result) => {
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
