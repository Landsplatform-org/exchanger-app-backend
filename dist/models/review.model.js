"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const db_1 = __importDefault(require("../config/db"));
class Review {
    getAll(limit, page) {
        return new Promise((resolve, reject) => {
            const offset = +page * +limit;
            const sql = `SELECT * FROM ea_reviews LIMIT ${limit} OFFSET ${offset}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_reviews WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("News was not found");
                resolve(result[0]);
            });
        });
    }
    add(review) {
        return new Promise((resolve, reject) => {
            const { user_id, review_title, review_text, review_status } = review;
            const sql = `
        INSERT INTO ea_reviews (user_id, review_title, review_text, review_status) 
        VALUES (${user_id}, ${review_title}, ${review_text}, ${review_status})
      `;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("New review was added");
            });
        });
    }
    update(id, reviewBody) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `UPDATE ea_reviews SET ${reviewBody} WHERE id=${id}`;
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
                const sql = `DELETE FROM ea_reviews WHERE id=${id}`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("Review was deleted");
                });
            })
                .catch((error) => reject(error));
        });
    }
    find(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_reviews WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Review not found");
                resolve(result[0]);
            });
        });
    }
}
exports.Review = Review;
