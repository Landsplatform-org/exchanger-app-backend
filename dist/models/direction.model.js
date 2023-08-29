"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = void 0;
const db_1 = __importDefault(require("../config/db"));
class Direction {
    getAll(limit, page) {
        const offset = +page * +limit;
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_directions LIMIT ${limit} OFFSET ${offset}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_directions WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Direction not found");
                resolve(result[0]);
            });
        });
    }
    add(direction) {
        return new Promise((resolve, reject) => {
            const { currency_id_send, currency_id_receive, currency_rate_source, rate_out, rate_in, rate_out_correction, rate_in_correction, sender_fee_type, receiver_fee_type, ref_fee_type_id, process_type_id, is_active, } = direction;
            const sql = `
        INSERT INTO ea_directions 
        (currency_id_send, currency_id_receive, currency_rate_source, rate_out, rate_in, rate_out_correction, rate_in_correction, sender_fee_type, receiver_fee_type, ref_fee_type_id, process_type_id, is_active) 
        VALUES (${currency_id_send}, ${currency_id_receive}, ${currency_rate_source}, ${rate_out}, ${rate_in}, ${rate_out_correction}, ${rate_in_correction}, ${sender_fee_type}, ${receiver_fee_type}, ${ref_fee_type_id}, ${process_type_id}, ${is_active})
      `;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("New direction was added");
            });
        });
    }
    update(id, directionBody) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `UPDATE ea_directions SET ${directionBody} WHERE id=${id}`;
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
                const sql = `DELETE FROM ea_directions WHERE id=${id}`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("Direction was deleted");
                });
            })
                .catch((error) => reject(error));
        });
    }
    //Сделать
    refresh() { }
    find(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_directions WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Direction not found");
                resolve("Direction was found");
            });
        });
    }
}
exports.Direction = Direction;
