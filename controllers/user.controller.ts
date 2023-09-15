import type { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/generateJWT";

import type { IUser } from "../schemas/user.schema";
import { User } from "../models/user.model";
import bycrypt from "bcrypt";
import dotenv from "dotenv";
import { generate } from "../utils/picode-generator";
import path from "path";
import randomstring from "randomstring";
import { sendMail } from "../helpers/email";
import { validationResult } from "express-validator";

dotenv.config();

const users = new User();

const EXPIRE_TIME = 72 * 60 * 60 * 1000;

export const getUsers = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";
  const username = req.query.username ? (req.query.username as string) : "";

  try {
    const result = await users.getAll(limit, page, username);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Successful",
    });
  } catch (error) {
    return res.status(404).send({
      status: 404,
      message: error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  let result;

  try {
    const isUserHasAccounts = await users.isUserHasAccounts(id);

    if (isUserHasAccounts) {
      result = await users.getByIdWithMerge(id);
    } else {
      result = await users.getById(id);
    }

    return res.status(200).send({
      status: 200,
      data: result,
      message: "Successful",
    });
  } catch (error) {
    return res.status(404).send({
      status: 404,
      message: error,
    });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const bodyToAdd: IUser = req.body;

  if (!bodyToAdd) return;

  try {
    const hashedPassword = bycrypt.hashSync(bodyToAdd.password, 10);

    const result = await users.add(bodyToAdd, hashedPassword);
    return res.status(201).send({
      status: 201,
      data: result,
      message: "Successful",
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate = req.body;
  const { userToUpdate } = bodyToUpdate;

  if (!userToUpdate) return;

  try {
    const result = await users.update(id, userToUpdate);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Successful",
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await users.delete(id);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Successful",
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).send({
      errors: errors.array(),
    });

  const mailSubject = "Mail Verification";
  const randomToken = randomstring.generate();

  try {
    const hashedPassword = bycrypt.hashSync(password, 10);
    const result = await users.register(
      { username, email, password },
      hashedPassword
    );

    const content =
      "<p>Hello " +
      username +
      ", please <a href=" +
      process.env.BASE_WEB_URL +
      "mail-verification/?token=" +
      randomToken +
      "&email=" +
      email +
      "> Verify" +
      " " +
      "</a>your mail</p>";

    sendMail(email, mailSubject, content);
    await users.updateToken(randomToken, email);

    return res.status(201).send({
      status: 201,
      data: result,
      message: `Вы были успешно зарегистрированы! Вам было отправлено письмо на почту ${email} для ее подтверждения`,
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

export const authJWT = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const response = await users.tryLogIn(username);
    if (response) {
      bycrypt.compare(
        password,
        response.password,
        (err: Error | undefined, same: boolean) => {
          if (!same) {
            return res.status(404).send({
              status: 404,
              message: "Неверное имя пользователя или пароль",
            });
          }
          
          return res.status(200).send({
            status: 200,
            user: response,
            tokens: {
              access: generateAccessToken(response),
              refresh: generateRefreshToken(response)
            },
            expiresIn: Date.now() + EXPIRE_TIME
          });
        }
      );
    }
  } catch (error) {
    return res.status(404).send({
      status: 404,
      message: error,
    });
  }
};

export const refreshJWT = (req: Request, res: Response) => {
  const user = req.user
  
  return res.status(200).send({
    message: "Обновлены",
    tokens: {
      access: generateAccessToken(user),
      refresh: generateRefreshToken(user)
    }
  })
}

export const verifyMail = async (req: Request, res: Response) => {
  const { token, email } = req.query;

  const PIN = generate(4);
  const hashedPIN = bycrypt.hashSync(PIN, 10);

  try {
    const result = await users.verifyMail(token as string);
    await users.setPIN(hashedPIN, email as string);

    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h1>${result}</h1>
        <h2>Ваш пин-код: ${PIN}, сохраните его для подтверждения операций!</h2>
        <p>Можете закрыть эту страницу</p>
      </body>
      </html>
    `);
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  const email = req.body.email;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const mailSubject = "Забыли пароль";
  const randomToken = randomstring.generate();

  try {
    const result = await users.getByEmail(email);

    const content =
      "<p>Hello" +
      " " +
      result.username +
      ", please <a href=" +
      process.env.BASE_WEB_URL +
      "reset-password/?token=" +
      randomToken +
      "> Reset " +
      "</a> your password</p>";

    sendMail(email, mailSubject, content);
    await users.updateToken(randomToken, email);

    return res.status(201).send({
      status: 201,
      data: "Письмо отправлено на почту " + email,
      message: "Successful",
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const token = req.query.token as string;

  const defaultPassword = bycrypt.hashSync(
    process.env.DEFAULT_PASSWORD as string,
    10
  );

  try {
    await users.resetPassword(token, defaultPassword);
    return res
      .status(200)
      .sendFile(path.join(__dirname, "..", "views", "resetPassword.html"));
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;

  const hashedNewPassword = bycrypt.hashSync(newPassword as string, 10);

  try {
    const result = await users.getOldPassword(id);

    const oldPasswordFromDB = result;

    bycrypt.compare(
      oldPassword,
      oldPasswordFromDB as string,
      async (error, response) => {
        if (error) throw error;
        if (!response)
          return res.status(400).send({
            status: 400,
            message: "Passwords don't match",
          });

        await users.changePassword(id, hashedNewPassword);
        return res.status(200).send({
          status: 200,
          message: "Password has changed successfully",
        });
      }
    );
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

export const checkEMail = async (req: Request, res: Response) => {
  const { oldEmail, newEmail } = req.body;
  const token = randomstring.generate();

  try {
    const result = await users.checkEmail(newEmail);

    const mailSubject = "Email change";
    const content =
      "Please <a href=" +
      process.env.BASE_WEB_URL +
      "change-email?token=" +
      token +
      "&oldEmail=" +
      oldEmail +
      "&newEmail=" +
      newEmail +
      "> Click this </a> to confirm that you really want to change your email to new one: " +
      newEmail +
      " </p>";

    sendMail(oldEmail, mailSubject, content);

    return res.status(200).send({
      status: 200,
      message: result,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

export const changeEmail = async (req: Request, res: Response) => {
  const oldEmail = req.query.oldEmail as string;
  const newEmail = req.query.newEmail as string;

  try {
    const result = await users.changeEmail(oldEmail, newEmail);

    const mailSubject = "Successful email change";
    const content = "This your new email for exchanger-app";

    sendMail(newEmail, mailSubject, content);

    return res
      .status(200)
      .sendFile(path.join(__dirname, "..", "views", "changedEmail.html"));
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

export const setAvatar = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!req.file)
    return res.status(404).send({
      status: 404,
      message: "File was not found",
    });

  const file = req.file.filename;

  try {
    const result = await users.setAvatar(id, file);
    res.status(200).send({
      status: 200,
      message: "Фото профиля было успешно обновлено",
      data: result
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

// export const getUser = (req: Request, res: Response) => {
//   res.send(req.user);
// };
