import { Request, Response } from "express";

import { Currency } from "../models/currency.model";
import { ICurrency } from "../schemas/currency.schema";

const currencies = new Currency();

export const getCurrencies = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await currencies.getAll(limit, page);
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

export const getCurrencyById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await currencies.getById(id);
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

export const addCurrency = async (req: Request, res: Response) => {
  const bodyToAdd: ICurrency = req.body

  if (!bodyToAdd) return;

  try {
    const result = await currencies.add(bodyToAdd);
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

export const updateCurrency = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: ICurrency = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await currencies.update(id, bodyToUpdate);
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

export const deleteCurrency = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await currencies.delete(id);
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
