import { IReview } from "../schemas/review.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class Review {
  getAll(limit: string, page: string): Promise<IReview[]> {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_reviews LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: IReview[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getById(id: string): Promise<IReview> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_reviews WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IReview[]) => {
        if (err) reject(err);
        if (!result[0]) reject("News was not found");
        resolve(result[0]);
      });
    });
  }

  add(review: IReview) {
    return new Promise((resolve, reject) => {
      const { user_id, review_title, review_text, review_status } = review;

      const sql = `
        INSERT INTO ea_reviews (user_id, review_title, review_text, review_status) 
        VALUES (${user_id}, ${review_title}, ${review_text}, ${review_status})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New review was added");
      });
    });
  }

  update(id: string, reviewBody: IReview) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_reviews SET ${reviewBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_reviews WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Review was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string): Promise<IReview> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_reviews WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IReview[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Review not found");
        resolve(result[0]);
      });
    });
  }
}
