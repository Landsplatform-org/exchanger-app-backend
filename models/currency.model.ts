import { ICurrency } from "../schemas/currency.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class Currency {
  getAll(limit: string, page: string) {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_currencies LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: ICurrency[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getById(id: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_currencies WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: ICurrency[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Currency not found");
        resolve(result[0]);
      });
    });
  }

  add(currency: ICurrency) {
    return new Promise((resolve, reject) => {
      const {
        gateway_id,
        prefix,
        currency_name,
        min_amount,
        max_amount,
        reserve,
        default_send,
        default_receive,
        status,
      } = currency;

      const sql = `
        INSERT INTO 
        ea_currencies (gateway_id, prefix, currency, min_amount, max_amount, reserve, default_send, default_receive, status) 
        VALUES (${gateway_id}, ${prefix}, ${currency_name}, ${min_amount}, ${max_amount}, ${reserve}, ${default_send}, ${default_receive}, ${status})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New currency was added");
      });
    });
  }

  update(id: string, currencyBody: ICurrency) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_currencies SET ${currencyBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_currencies WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Currency was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_currencies WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: ICurrency[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Currency not found");
        resolve("Currency was found");
      });
    });
  }
}
