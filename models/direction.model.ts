import { IDirection } from "../schemas/direction.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class Direction {
  getAll(limit: string, page: string) {
    const offset = +page * +limit;

    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_directions LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: IDirection[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getById(id: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_directions WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IDirection[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Direction not found");
        resolve(result[0]);
      });
    });
  }

  add(direction: IDirection) {
    return new Promise((resolve, reject) => {
      const {
        currency_id_send,
        currency_id_receive,
        currency_rate_source,
        rate_out,
        rate_in,
        rate_out_correction,
        rate_in_correction,
        sender_fee_type,
        receiver_fee_type,
        ref_fee_type_id,
        process_type_id,
        is_active,
      } = direction;

      const sql = `
        INSERT INTO ea_directions 
        (currency_id_send, currency_id_receive, currency_rate_source, rate_out, rate_in, rate_out_correction, rate_in_correction, sender_fee_type, receiver_fee_type, ref_fee_type_id, process_type_id, is_active) 
        VALUES (${currency_id_send}, ${currency_id_receive}, ${currency_rate_source}, ${rate_out}, ${rate_in}, ${rate_out_correction}, ${rate_in_correction}, ${sender_fee_type}, ${receiver_fee_type}, ${ref_fee_type_id}, ${process_type_id}, ${is_active})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New direction was added");
      });
    });
  }

  update(id: string, directionBody: IDirection) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_directions SET ${directionBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_directions WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Direction was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  //Сделать
  refresh() {}

  private find(id: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_directions WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IDirection[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Direction not found");
        resolve("Direction was found");
      });
    });
  }
}
