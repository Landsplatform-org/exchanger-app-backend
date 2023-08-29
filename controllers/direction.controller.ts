import { Request, Response } from "express";

import { Direction } from "../models/direction.model";
import { IDirection } from "../schemas/direction.schema";

const directions = new Direction();

export const getDirections = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await directions.getAll(limit, page);
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

export const getDirectionById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await directions.getById(id);
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

export const addDirection = async (req: Request, res: Response) => {
  const bodyToAdd: IDirection = req.body

  if (!bodyToAdd) return;

  try {
    const result = await directions.add(bodyToAdd);
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

export const updateDirection = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: IDirection = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await directions.update(id, bodyToUpdate);
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

export const deleteDirection = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await directions.delete(id);
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

//Сделать
export const refreshDirections = async (req: Request, res: Response) => {
  
}
