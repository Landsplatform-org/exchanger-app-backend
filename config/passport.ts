import type { IUser } from "../schemas/user.schema";
import type { MysqlError } from "mysql";
import bcrypt from "bcrypt";
import db from "./db";
import passportLocal from "passport-local";

const localStrategy = passportLocal.Strategy;

// Authentication middleware || связующий компонент аутентификации
module.exports = (passport: any) => {
  passport.use(
    new localStrategy((username: string, password: string, done: any) => {
      const getByUsernameQuery = `SELECT * FROM ea_users WHERE username=${username}`;
      db.query(
        getByUsernameQuery,
        (err: MysqlError | null, result: IUser[]) => {
          if (err) throw err;

          if (!result.length) return done(null, false, { message: "username does not exists" });

          bcrypt.compare(
            password,
            result[0].password,
            (err: any, response: any) => {
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
  passport.serializeUser((user: IUser, done: any) => {
    done(null, user.id);
  });

  // User deserializing || предоставление пользователей
  passport.deserializeUser((id: number, done: any) => {
    const getByIdQuery = `SELECT * FROM ea_users WHERE id=${id}`;
    db.query(getByIdQuery, (err: MysqlError | null, result: IUser[]) => {
      if (err) throw err;

      const userInfo = {
        id: result[0].id,
        username: result[0].username,
        email: result[0].email,
        isVerified: result[0].is_verified,
        avatarImage: result[0].avatar,
      };
      done(null, userInfo);
    });
  });
};
