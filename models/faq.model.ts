import { IFAQ } from "../schemas/faq.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class FAQ {
  getAll(limit: string, page: string): Promise<IFAQ[]> {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_faq LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: IFAQ[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getById(id: string): Promise<IFAQ> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_faq WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IFAQ[]) => {
        if (err) reject(err);
        if (!result[0]) reject("FAQ was not found");
        resolve(result[0]);
      });
    });
  }

  add(faq: IFAQ) {
    return new Promise((resolve, reject) => {
      const { question, answer, category_id, status} = faq;

      const sql = `
        INSERT INTO ea_faq (question, answer, category_id, status) 
        VALUES (${question}, ${answer}, ${category_id}, ${status})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New FAQ was added");
      });
    });
  }

  update(id: string, faqBody: IFAQ) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_faq SET ${faqBody} WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null, result: ResultSetHeader) => {
            if (err) reject(err);
            resolve(result);
          });
        })
        .catch((error) => reject(error));
    });
  }

  delete(id: string) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `DELETE FROM ea_faq WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("FAQ was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string): Promise<IFAQ> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_faq WHERE id=${id}`;
      
      db.query(sql, (err: MysqlError | null, result: IFAQ[]) => {
        if (err) reject(err);
        if (!result[0]) reject("FAQ not found");
        resolve(result[0]);
      });
    });
  }
}
