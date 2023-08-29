import { IParserPair } from "../schemas/parser_pairs.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class ParserPair {
  getAll(limit: string, page: string) {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_parser_pairs_data LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: IParserPair[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getAllBySourceId(sourceId: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_parser_pairs_data WHERE parse_source_id=${sourceId}`;

      db.query(sql, (err: MysqlError | null, result: IParserPair[]) => {
        if (err) reject(err);
        if (!result.length) reject("Parser-pairs not found");
        resolve(result);
      });
    });
  }

  add(parserPair: IParserPair) {
    return new Promise((resolve, reject) => {
      const { parse_source_id, parse_title, parse_pair, parse_nominal, parse_course, parse_code } = parserPair;

      const sql = `
        INSERT INTO ea_parser_pairs_data (parse_source_id, parse_title, parse_pair, parse_nominal, parse_course, parse_code) 
        VALUES (${parse_source_id}, ${parse_title}, ${parse_pair}, ${parse_nominal}, ${parse_course}, ${parse_code})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New parser-pair was added");
      });
    });
  }

  update(id: string, parserPairBody: IParserPair) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_parser_pairs_data SET ${parserPairBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_parser_pairs_data WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Parser-pair was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_parser_pairs_data WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IParserPair[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Parser-pair not found");
        resolve("Parser-pair was found");
      });
    });
  }
}
