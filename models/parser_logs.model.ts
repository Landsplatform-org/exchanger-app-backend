import { IParserLog } from "../schemas/parser_logs.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class ParserLog {
  getAll(limit: string, page: string) {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_parser_logs LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: IParserLog[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getById(id: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_parser_logs WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IParserLog[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Parser-log not found");
        resolve(result[0]);
      });
    });
  }

  add(parserLog: IParserLog) {
    return new Promise((resolve, reject) => {
      const {name, parsing_status, parsing_update } = parserLog;

      const sql = `
        INSERT INTO ea_parser_logs (name, parsing_status, parsing_update) 
        VALUES (${name}, ${parsing_status}, ${parsing_update})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New parser-log was added");
      });
    });
  }

  update(id: string, parserLogBody: IParserLog) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_parser_logs SET ${parserLogBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_parser_logs WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Parser-log was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_parser_logs WHERE id=${id}`;
      
      db.query(sql, (err: MysqlError | null, result: IParserLog[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Parser-log not found");
        resolve("Parser-log was found");
      });
    });
  }
}
