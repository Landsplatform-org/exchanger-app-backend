import { INews } from "../schemas/news.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class News {
  getAll(limit: string, page: string): Promise<INews[]> {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_news LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: INews[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getById(id: string): Promise<INews> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_news WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: INews[]) => {
        if (err) reject(err);
        if (!result[0]) reject("News was not found");
        resolve(result[0]);
      });
    });
  }

  add(news: INews) {
    return new Promise((resolve, reject) => {
      const { title, description, text, status } = news;

      const sql = `
        INSERT INTO ea_news (title, description, text, status) 
        VALUES (${title}, ${description}, ${text}, ${status})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New news was added");
      });
    });
  }

  update(id: string, newsBody: INews) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_news SET ${newsBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_news WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("News was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  setPhoto(id: string, photo: string) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_news SET photo=${photo} WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("News photo was updated successfully");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string): Promise<INews> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_news WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: INews[]) => {
        if (err) reject(err);
        if (!result[0]) reject("News not found");
        resolve(result[0]);
      });
    });
  }
}
