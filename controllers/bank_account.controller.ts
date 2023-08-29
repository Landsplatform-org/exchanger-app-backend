import type { Request, Response } from "express";

import { BankAccount } from '../models/bank_account.model';
import type { IBankAccount } from "../schemas/bank_account.schema";

const bankAccounts = new BankAccount();

export const getBankAccounts = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await bankAccounts.getAll(limit, page);
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

export const getBankAccountById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await bankAccounts.getById(id);
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

export const addBankAccount = async (req: Request, res: Response) => {
  const bodyToAdd: IBankAccount = req.body;

  if (!bodyToAdd) return;

  try {
    const result = await bankAccounts.add(bodyToAdd);
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

export const updateBankAccount = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: IBankAccount = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await bankAccounts.update(id, bodyToUpdate);
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

export const deleteBankAccount = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await bankAccounts.delete(id);
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
