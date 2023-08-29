import { Request, Response } from "express";

import { Exchange } from "../models/exchange.model";
import { IExchange } from "../schemas/exchange.schema";

const exchanges = new Exchange();

export const getExchanges = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";
  const statusId = req.query.status ? (req.query.page as string) : "";
  const hash = req.query.hash ? (req.query.limit as string) : ""; 
  const sortType = req.query.date ? (req.query.limit as string) : "ASC"; 

  try {
    const result = await exchanges.getAll(limit, page, statusId, hash, sortType);
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

export const getExchangeById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await exchanges.getById(id);
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

export const addExchange = async (req: Request, res: Response) => {
  const bodyToAdd: IExchange = req.body

  if (!bodyToAdd) return;

  try {
    const result = await exchanges.add(bodyToAdd);
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

export const updateExchange = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: IExchange = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await exchanges.update(id, bodyToUpdate);
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

export const deleteExchange = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await exchanges.delete(id);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Successful"
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error
    })
  }
};