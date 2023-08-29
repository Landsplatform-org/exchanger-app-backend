import { ITechSupport } from "../schemas/tech_support.schema";
import { MysqlError } from "mysql";
import db from "../config/db";

export class TechSupport {
  getAllSupportMessages(limit: string, page: string): Promise<ITechSupport[]> {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_techsupport LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: ITechSupport[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getSupportMessage(id: string): Promise<ITechSupport> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_techsupport WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: ITechSupport[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Message was not found");
        resolve(result[0]);
      });
    });
  }

  add(message: ITechSupport) {
    return new Promise((resolve, reject) => {
      const { user_id, user_email, text, image } = message;

      const sql = `
        INSERT INTO ea_techsupport (user_id, user_email, text, image) 
        VALUES (${user_id}, ${user_email}, ${text}, ${image})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New message was added");
      });
    })
  }

  delete(id: string) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `DELETE FROM ea_techsupport WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Message was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string): Promise<ITechSupport> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_users WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: ITechSupport[]) => {
        if (err) reject(err);
        if (!result[0]) reject("User not found");
        resolve(result[0]);
      });
    });
  }
}