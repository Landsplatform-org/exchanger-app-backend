import { IPage } from "../schemas/page.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class Page {
  getAll(limit: string, page: string): Promise<IPage[]> {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_pages LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: IPage[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getById(id: string): Promise<IPage> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_pages WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IPage[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Page was not found");
        resolve(result[0]);
      });
    });
  }

  add(page: IPage) {
    return new Promise((resolve, reject) => {
      const { title, alias, description, text, status } = page;

      const sql = `
        INSERT INTO ea_pages (title, alias, description, text, status) 
        VALUES (${title}, ${alias}, ${description}, ${text}, ${status})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New page was added");
      });
    });
  }

  update(id: string, pageBody: IPage) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_pages SET ${pageBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_pages WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Page was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  setPhoto(id: string, photo: string) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_pages SET photo=${photo} WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Page photo was updated successfully");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string): Promise<IPage> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_pages WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IPage[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Page not found");
        resolve(result[0]);
      });
    });
  }
}
