import type { IUser } from "../schemas/user.schema";
import type { MysqlError } from "mysql";
import bcrypt from "bcrypt";
import db from "./db";
import passportLocal from "passport-local";

const localStrategy = passportLocal.Strategy;

// Authentication middleware || связующий компонент аутентификации
module.exports = function (passport: any) {
  passport.use(
    new localStrategy(function (username: string, password: string, done: any) {
      const getByUsernameQuery = `SELECT * FROM ea_users WHERE username='${username}'`;
      db.query(
        getByUsernameQuery,
        function (err: MysqlError | null, result: IUser[]) {
          if (err) throw err;

          if (!result.length)
            return done(null, false, {
              message: "Пользователя с таким именем не существует",
            });

          bcrypt.compare(
            password,
            result[0].password,
            function (err: any, response: any) {
              if (err) throw err;

              if (response) {
                return done(null, result[0]);
              } else {
                return done(null, false);
              }
            }
          );
        }
      );
    })
  );

  // User serializing || упорядочивание (складирование) пользователей
  passport.serializeUser(function (user: IUser, done: any) {
    done(null, user.id);
  });

  // User deserializing || предоставление пользователей
  passport.deserializeUser(function (id: number, done: any) {
    const getByIdQuery = `SELECT * FROM ea_users INNER JOIN ea_bank_accounts ON ea_users.id=ea_bank_accounts.user_id WHERE ea_users.id='${id}'`;
    db.query(getByIdQuery, (err: MysqlError | null, result: IUser) => {
      if (err) throw err;

      const user = result;
      done(null, user);
    });
  });
};
