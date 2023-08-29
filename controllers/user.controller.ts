import type { Request, Response } from "express";

import type { IUser } from "../schemas/user.schema";
import { User } from "../models/user.model";
import bycrypt from "bcrypt";
import { generate } from "../utils/picode-generator";
import passport from "passport";
import path from "path";
import randomstring from "randomstring";
import { sendMail } from "../helpers/email";
import { validationResult } from "express-validator";

const users = new User();

export const getAllUsers = async (req: Request, res: Response) => {
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

  try {
    const result = await users.getById(id);
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
  const bodyToUpdate: IUser = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await users.update(id, bodyToUpdate);
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
  const bodyToRegister: IUser = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).send({
      errors: errors.array(),
    });

  const mailSubject = "Mail Verification";
  const randomToken = randomstring.generate();

  try {
    const hashedPassword = bycrypt.hashSync(bodyToRegister.password, 10);
    const result = await users.register(bodyToRegister, hashedPassword);

    const content =
      "<p>Hello " +
      bodyToRegister.username +
      ", please <a href=" +
      process.env.BASE_WEB_URL +
      "mail-verification/?token=" +
      randomToken +
      "&email=" +
      bodyToRegister.email +
      "> Verify" +
      " " +
      "</a>your mail</p>";

    sendMail(bodyToRegister.email, mailSubject, content);
    await users.updateToken(randomToken, bodyToRegister.email);

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

export const loginUser = (req: Request, res: Response) => {
  passport.authenticate("local", (err: any, user: IUser) => {
    if (err)
      return res.status(401).send({
        status: 401,
        message: err,
      });

    if (!user)
      res.status(400).send({
        status: 400,
        message: "Username or password is invalid",
      });

    req.login(user, (err: any) => {
      if (err) throw err;

      res.status(200).send({
        status: 200,
        message: "User was logged in successfully",
      });
    });
  })(req, res);
};

export const verifyMail = async (req: Request, res: Response) => {
  const { token, email } = req.query;

  const PIN = generate(4);
  const hashedPIN = bycrypt.hashSync(PIN, 10);

  try {
    const result = await users.verifyMail(token as string);
    const response = await users.setPIN(hashedPIN, email as string);
    return res.status(200).send({
      status: 200,
      data: result,
      pin: PIN,
      pin_message: response,
    });
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

  const mailSubject = "Forget Password";
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
      data: "Email was sent to " + email,
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
      .sendFile(path.join(__dirname, "..", "views", "resetPassword.html"))
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
      async (err, response) => {
        if (err) throw err;
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
      message: result,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

