import { Request, Response } from "express";

import { Exchange } from "../models/exchange.model";
import { IExchange } from "../schemas/exchange.schema";
import crc32 from "crc-32";

const exchanges = new Exchange();

export const getExchanges = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";
  const statusId = req.query.status ? (req.query.status as string) : "";
  const hash = req.query.hash ? (req.query.hash as string) : ""; 
  const sortType = req.query.date ? (req.query.date as string) : "ASC"; 

  try {
    const result = await exchanges.getAll(limit, page, statusId, hash, sortType);
    console.log(result)
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

  const hashedBody = crc32.buf((Object.values(bodyToAdd)))

  try {
    const result = await exchanges.add(bodyToAdd, hashedBody);
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