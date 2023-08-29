import { IGateway } from "../schemas/gateway.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class Gateway {
  getAll(limit: string, page: string) {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_gateways LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: IGateway[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getById(id: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_gateways WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IGateway[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Gateway not found");
        resolve(result[0]);
      });
    });
  }

  add(gateway: IGateway) {
    return new Promise((resolve, reject) => {
      const { alias, name, value, is_crypto, status } = gateway;

      const sql = `
        INSERT INTO ea_gateways (alias, name, value, is_crypto, status) 
        VALUES (${alias}, ${name}, ${value}, ${is_crypto}, ${status})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New gateway was added");
      });
    });
  }

  update(id: string, gatewayBody: IGateway) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_gateways SET ${gatewayBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_gateways WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Gateway was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_gateways WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IGateway[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Gateway not found");
        resolve("Gateway was found");
      });
    });
  }
}
