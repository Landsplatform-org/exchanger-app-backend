import { IAppSetting } from "../schemas/app_setting.schema";
import { MysqlError } from "mysql";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

export class AppSetting {
  getAll(limit: string, page: string): Promise<IAppSetting[]> {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_app_settings LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: IAppSetting[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  update(id: string, appSettingBody: IAppSetting) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_app_settings SET ${appSettingBody} WHERE id=${id}`;

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
          const sql = `DELETE FROM ea_app_settings WHERE id=${id}`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Setting was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private find(id: string): Promise<IAppSetting> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_app_settings WHERE id=${id}`;

      db.query(sql, (err: MysqlError | null, result: IAppSetting[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Setting not found");
        resolve(result[0]);
      });
    });
  }
}
