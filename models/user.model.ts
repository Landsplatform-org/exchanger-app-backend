import { ResultSetHeader, RowDataPacket } from "mysql2";

import { IRegisterForm } from "../schemas/user_register.schema";
import { IUser } from "../schemas/user.schema";
import { MysqlError } from "mysql";
import db from "../config/db";
import { mergeBankAccounts } from "../utils/mergeBankAccounts";

export class User {
  getAll(limit: string, page: string, username: string): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      const offset = +page * +limit;
      const sql = `SELECT * FROM ea_users WHERE username LIKE '${username}%' LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err: MysqlError | null, result: IUser[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  isUserHasAccounts(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_bank_accounts WHERE user_id='${id}'`;

      db.query(sql, (err: MysqlError | null, result: RowDataPacket[]) => {
        if(err) reject(err)
        if(!result.length) resolve(false)
        resolve(true);
      })
    })
  }

  getById(id: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT u.id, u.username, u.email, u.password, u.firstname, u.lastname, u.phone, u.avatar, u.is_verified
                   FROM ea_users u WHERE u.id='${id}'`;
      
      db.query(sql, (err: MysqlError | null, result: IUser[]) => {
        if (err) reject(err);
        if (!result.length) reject("Пользователь не найден");
        resolve(result[0]) 
      })
    })
  }

  getByIdWithMerge(id: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT u.id, u.username, u.email, u.password, u.firstname, u.lastname, u.phone, u.avatar, u.is_verified, b.account 
                   FROM ea_users u JOIN ea_bank_accounts b ON u.id=b.user_id WHERE u.id='${id}'`;

      db.query(sql, (err: MysqlError | null, result: IUser[]) => {

        if (err) reject(err);
        if (!result.length) reject("Пользователь не найден");
        resolve(mergeBankAccounts(result)) 
      });
    });
  }

  getByEmail(email: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_users WHERE id='${email}'`;

      db.query(sql, (err: MysqlError | null, result: IUser[]) => {
        if (err) reject(err);
        if (!result[0]) reject("Пользователь не найден");
        resolve(result[0]);
      });
    });
  }

  add(user: IUser, password: string) {
    return new Promise((resolve, reject) => {
      const {
        ref_id,
        username,
        firstname,
        lastname,
        email,
        ref_fee_type,
        ref_fee,
        role_id,
        status_id,
      } = user;

      const sql = `
        INSERT INTO ea_users (ref_id, username, firstname, lastname, email, password, ref_fee_type, ref_fee, role_id, status_id) 
        VALUES ('${ref_id}', '${username}', '${firstname}', '${lastname}', '${email}', '${password}', '${ref_fee_type}', '${ref_fee}', '${role_id}', '${status_id}')
      `;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("New user was added");
      });
    });
  }

  update(id: string, userBody: IUser) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_users SET '${userBody}' WHERE id='${id}'`;

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
          const sql = `DELETE FROM ea_users WHERE id='${id}'`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("User was deleted");
          });
        })
        .catch((error) => reject(error));
    });
  }

  register(user: IRegisterForm, password: string) {
    return new Promise((resolve, reject) => {
      const { username, email } = user;

      this.isUserExist(username, email)
        .then(() => {
          const sql = `INSERT INTO ea_users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Пользователь был успешно зарегистрирован!");
          });
        })
        .catch((error) => reject(error));
    });
  }

  updateToken(token: string, email: string) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ea_users SET token='${token}' WHERE email='${email}'`;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("Token was updated");
      });
    });
  }

  verifyMail(token: string) {
    return new Promise((resolve, reject) => {
      this.getToken(token)
        .then((id) => {
          const sql = `UPDATE ea_users SET token=NULL, is_verified=1 WHERE id='${id}'`;

          db.query(sql, () => {
            resolve("Email was verified");
          });
        })
        .catch((error) => reject(error));
    });
  }

  setPIN(pin: string, email: string) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ea_users SET pin='${pin}' WHERE email='${email}'`;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("PIN was created");
      });
    });
  }

  getOldPassword(id: string) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then((user) => {
          const password = user.password;
          resolve(password);
        })
        .catch((error) => reject(error));
    });
  }

  changePassword(id: string, password: string) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ea_users SET password='${password}' WHERE id='${id}'`;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("User has changed password");
      });
    });
  }

  checkEmail(email: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_users WHERE email='${email}'`;

      db.query(sql, (err: MysqlError | null, result: IUser[]) => {
        if (err) reject(err);
        if (result[0]) reject("This email already exist");
        resolve("You can use this email");
      });
    });
  }

  changeEmail(oldEmail: string, newEmail: string) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ea_users SET email=${newEmail} WHERE email=${oldEmail}`;

      db.query(sql, (err: MysqlError | null) => {
        if (err) reject(err);
        resolve("User has changed email");
      });
    });
  }

  resetPassword(token: string, defaultPassword: string) {
    return new Promise((resolve, reject) => {
      this.getToken(token)
        .then((id) => {
          const sql = `UPDATE ea_users SET token=NULL, password='${defaultPassword}' WHERE id='${id}'`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("Password was reset successfully");
          });
        })
        .catch((error) => reject(error));
    });
  }

  setAvatar(id: string, avatar: string) {
    return new Promise((resolve, reject) => {
      this.find(id)
        .then(() => {
          const sql = `UPDATE ea_users SET avatar='${avatar}' WHERE id='${id}'`;

          db.query(sql, (err: MysqlError | null) => {
            if (err) reject(err);
            resolve("User avatar was updated successfully");
          });
        })
        .catch((error) => reject(error));
    });
  }

  private isUserExist(username: string, email: string) {
    const checkUsername = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_users WHERE username='${username}'`;

      db.query(sql, (err: MysqlError | null, result: IUser[]) => {
        if (err) reject(err);
        if (result[0])
          reject("Пользователь с таким имененем пользователя уже существует");
        resolve("Это имя пользователя свободно");
      });
    });

    const checkEmail = new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_users WHERE email='${email}'`;

      db.query(sql, (err: MysqlError | null, result: IUser[]) => {
        if (err) reject(err);
        if (result[0]) reject("Пользователь с такой почтой уже существует");
        resolve("Эта почта доступна для регистрации");
      });
    });
    return Promise.all([checkUsername, checkEmail]);
  }

  private getToken(token: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_users WHERE token='${token}'`;

      db.query(sql, (err: MysqlError | null, result: IUser[]) => {
        if (err) reject(err);
        if (!result.length) return reject("Token has expired");
        resolve(result[0].id);
      });
    });
  }

  private find(id: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ea_users WHERE id='${id}'`;

      db.query(sql, (err: MysqlError | null, result: IUser[]) => {
        if (err) reject(err);
        if (!result[0]) reject("User not found");
        resolve(result[0]);
      });
    });
  }
}
