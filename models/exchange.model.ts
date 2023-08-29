import { IExchange } from "../schemas/exchange.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class Exchange {
  getAll(
    limit: string,
    page: string,
    statusId: string,
    hash: string,
    sortType: string
  ) {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `
        SELECT * FROM ea_exchanges 
        WHERE status_id LIKE '${statusId}%' AND hash LIKE '${hash}%' 
        ORDER BY created_at ${sortType} LIMIT ${limit} OFFSET ${offset}
      `;

      db.query(sql, (err: MysqlError | null, result: IExchange[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getById(id: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_exchanges WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IExchange[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Exchange not found");
        resolve(result[0]);
      });
    });
  }

  add(exchange: IExchange) {
    return new Promise((resolve, reject) => {
      const {
        user_id,
        direction_id,
        currency_id_send,
        currency_id_receive,
        hash,
        send_sum_without_fee,
        send_sum_with_fee,
        total_exchange_sum,
        pay_amount,
        rate_out,
        rate_in,
        receive_sum_without_fee,
        receive_sum_with_fee,
        process_type_id,
        status_id,
      } = exchange;

      const sql = `INSERT INTO ea_exchanges 
        (user_id, direction_id, currency_id_send, currency_id_receive, hash, send_sum_without_fee, send_sum_with_fee, total_exchange_sum, pay_amount, rate_out, rate_in, receive_sum_without_fee, receive_sum_with_fee, process_type_id, status_id) 
        VALUES (${user_id}, ${direction_id}, ${currency_id_send}, ${currency_id_receive}, ${hash}, ${send_sum_without_fee}, ${send_sum_with_fee}, ${total_exchange_sum}, ${pay_amount}, ${rate_out}, ${rate_in}, ${receive_sum_without_fee}, ${receive_sum_with_fee}, ${process_type_id}, ${status_id})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New exchange was added");
      });
    });
  }

  update(id: string, exchangeBody: IExchange) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_exchanges SET ${exchangeBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_exchanges WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Exchange was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_exchanges WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IExchange[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Exchange not found");
        resolve("Exchange was found");
      });
    });
  }
}
