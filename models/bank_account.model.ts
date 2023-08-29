import { IBankAccount } from "../schemas/bank_account.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class BankAccount {
  getAll(limit: string, page: string): Promise<IBankAccount[]> {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_bank_accounts LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: IBankAccount[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getById(id: string): Promise<IBankAccount> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_bank_accounts WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IBankAccount[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Account was not found");
        resolve(result[0]);
      });
    });
  }

  add(bankAccount: IBankAccount) {
    return new Promise((resolve, reject) => {
      const { user_id, currency_id, account } = bankAccount;

      const sql = `
        INSERT INTO ea_bank_accounts 
        (user_id, currency_id, account) 
        VALUES (${user_id}, ${currency_id}, ${account})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New account was added");
      });
    });
  }

  update(id: string, bankAccountBody: IBankAccount) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_bank_accounts SET ${bankAccountBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_bank_accounts WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Account was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string): Promise<IBankAccount> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_bank_accounts WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IBankAccount[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Account not found");
        resolve(result[0]);
      });
    });
  }
}
