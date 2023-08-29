"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const db_1 = __importDefault(require("../config/db"));
class Page {
    getAll(limit, page) {
        return new Promise((resolve, reject) => {
            const offset = +page * +limit;
            const sql = `SELECT * FROM ea_pages LIMIT ${limit} OFFSET ${offset}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_pages WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Page was not found");
                resolve(result[0]);
            });
        });
    }
    add(page) {
        return new Promise((resolve, reject) => {
            const { title, alias, description, text, status } = page;
            const sql = `
        INSERT INTO ea_pages (title, alias, description, text, status) 
        VALUES (${title}, ${alias}, ${description}, ${text}, ${status})
      `;
            db_1.default.query(sql, (err) => {
                if (err)
                    reject(err);
                resolve("New page was added");
            });
        });
    }
    update(id, pageBody) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `UPDATE ea_pages SET ${pageBody} WHERE id=${id}`;
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
                const sql = `DELETE FROM ea_pages WHERE id=${id}`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("Page was deleted");
                });
            })
                .catch((error) => reject(error));
        });
    }
    setPhoto(id, photo) {
        return new Promise((resolve, reject) => {
            this.find(id)
                .then(() => {
                const sql = `UPDATE ea_pages SET photo=${photo} WHERE id=${id}`;
                db_1.default.query(sql, (err) => {
                    if (err)
                        reject(err);
                    resolve("Page photo was updated successfully");
                });
            })
                .catch((error) => reject(error));
        });
    }
    find(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ea_pages WHERE id=${id}`;
            db_1.default.query(sql, (err, result) => {
                if (err)
                    reject(err);
                if (!result[0])
                    reject("Page not found");
                resolve(result[0]);
            });
        });
    }
}
exports.Page = Page;
