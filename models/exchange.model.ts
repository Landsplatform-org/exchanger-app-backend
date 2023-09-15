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
        SELECT e.ex_id, e.created_at, e.send_sum_with_fee, cs.currency AS currency_send, e.receive_sum_with_fee, cr.currency AS currency_receive, e.hash, e.status_id, es.ex_status_name, p.process_name, u.id 
        FROM ea_exchanges e 
        JOIN ea_currencies cs ON e.currency_id_send=cs.id 
        JOIN ea_currencies cr ON e.currency_id_receive=cr.id 
        JOIN ea_exchange_status es ON e.status_id=es.id 
        JOIN ea_process_types p ON e.process_type_id=p.id 
        JOIN ea_users u ON e.user_id=u.id 
        WHERE e.hash LIKE '${hash}%' AND e.status_id LIKE '${statusId}%' 
        ORDER BY e.created_at ${sortType} LIMIT ${limit} OFFSET ${offset}
      `
      
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

  add(exchange: IExchange, hash: number) {
    return new Promise((resolve, reject) => {
      const {
        user_id,
        direction_id,
        currency_id_send,
        currency_id_receive,
        send_sum_without_fee,
        send_sum_with_fee,
        send_sum_fee,
        send_client_sum_with_ps_fee,
        send_client_ps_fee,
        rate_out,
        rate_in,
        receive_sum_without_fee,
        receive_sum_with_fee,
        receive_sum_fee,
        receive_client_sum_with_ps_fee,
        receive_client_ps_fee,
        u_field_1,
        process_type_id,
        status_id,
      } = exchange;

      const sql = `INSERT INTO ea_exchanges (user_id,direction_id,currency_id_send,currency_id_receive,hash,send_sum_without_fee,send_sum_with_fee,send_sum_fee,send_client_sum_with_ps_fee,send_client_ps_fee,rate_out,rate_in,receive_sum_without_fee,receive_sum_with_fee,receive_sum_fee,receive_client_sum_with_ps_fee,receive_client_ps_fee,u_field_1,process_type_id,status_id) 
        VALUES (
            '${user_id}', 
            '${direction_id}', 
            '${currency_id_send}', 
            '${currency_id_receive}', 
            '${hash}', 
            '${send_sum_without_fee}', 
            '${send_sum_with_fee}', 
            '${send_sum_fee}', 
            '${send_client_sum_with_ps_fee}', 
            '${send_client_ps_fee}', 
            '${rate_out}', 
            '${rate_in}', 
            '${receive_sum_without_fee}', 
            '${receive_sum_with_fee}', 
            '${receive_sum_fee}', 
            '${receive_client_sum_with_ps_fee}', 
            '${receive_client_ps_fee}', 
            '${u_field_1}', 
            '${process_type_id}', 
            '${status_id}'
          )
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
