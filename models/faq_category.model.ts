import { IFAQCategory } from "../schemas/faq_category.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class FAQCategory {
  getAll(limit: string, page: string): Promise<IFAQCategory[]> {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_faq_categories LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: IFAQCategory[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getById(id: string): Promise<IFAQCategory> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_faq_categories WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IFAQCategory[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Category was not found");
        resolve(result[0]);
      });
    });
  }

  add(faqCategory: IFAQCategory) {
    return new Promise((resolve, reject) => {
      const { title, description, status } = faqCategory;

      const sql = `
        INSERT INTO ea_faq_categories (title, description, status) 
        VALUES (${title}, ${description}, ${status})
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New category was added");
      });
    });
  }

  update(id: string, faqCategoryBody: IFAQCategory) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_faq_categories SET ${faqCategoryBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_faq_categories WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Category was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string): Promise<IFAQCategory> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_faq_categories WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IFAQCategory[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Category not found");
        resolve(result[0]);
      });
    });
  }
}
